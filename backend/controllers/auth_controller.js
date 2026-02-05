import { and, eq, gt, isNull, not, sql } from "drizzle-orm";
import { db } from "../db.js";
import jwt from "jsonwebtoken"
import { authenticate, createAccessToken } from "../services/auth_service.js";
import Error_Response from "../utilis/Error_Response.js";
import  argon2  from "argon2";
import Success_Response from "../utilis/Success_Response.js";
import { roles, sessions, userInvites, userRoles, users } from "../drizzle/schema.js";
import crypto from "crypto"
import { generateResetToken } from "../utilis/GenerateResetToken.js";
import { ForgotPasswordEmail } from "../services/resend.js";


export async function registerUsers(req, res, next) {

    
    const {name, email, password} = req.body;  
    try {
        let userExisted = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
   
        if (userExisted.length > 0) {
            return next(new Error_Response("user with this email ID already exist!", 409))
        };
        const hashPassword = await argon2.hash(password);

        const insertedUser = await db.transaction(async (tx) => {
            const result = await tx.insert(users).values({
                username: name,
                email,
                password: hashPassword,
            });
            
            const newUser = await tx.select().from(users).where(eq(users.id, result[0].insertId)).limit(1);
            return newUser[0];
        });

        await authenticate({user: insertedUser, req, res})
        
    } catch (error) {
        console.log(error);        
        next(error)
    }    
}


export async function loginUsers(req, res, next) {
    const {email, password} = req.body;
    try {
        const userExisted = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        
        if (userExisted.length === 0) {           
           return next(new Error_Response("user doesn't exist!", 400))
        }
        const isValidPassword = await argon2.verify(userExisted[0].password, password)
;
        if (!isValidPassword) {
            return next(new Error_Response("password does not match!", 400))
        }
        
        await authenticate({user: userExisted[0], req, res})
    } catch (error) {
        console.log(error);             
        next(error)
    }
}



export async function logoutUser(req, res, next) { 
    try {
        const userId = req.params.id        
        await db.delete(sessions).where(eq(sessions.userId, userId))
        res.clearCookie("refreshToken")
        Success_Response(res, 204, 'logout successfully')
    } catch (error) {
        console.log(error);
        next(error)
    }
}


export async function issueToken(req, res, next) {
    
    try {
        const refreshToken = req.cookies.refreshToken;
        
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // const session =  await Session.findById(payload.id).populate('userId')
        
        const [session] = await db    
            .select({
                userId: users.id,
                userEmail: users.email,
                username : users.username 
            })
            .from(sessions)
            .innerJoin(
                users,
                eq(users.id, sessions.userId)            
            )
            .where(eq(sessions.id, payload.id))
            
            const userData = await db
                        .select({
                            username: users.username,
                            email: users.email,
                            roleName: roles.name,
                        })
                        .from(users)
                        .innerJoin(
                            userRoles, 
                            eq(users.id, userRoles.userId)
                        )
                        .innerJoin(
                            roles,
                            eq(userRoles.roleId, roles.id)
                        )
                        .where(eq(users.id, session.userId))
                    
        const accessToken = createAccessToken({
            id: session.userId, 
            email: session.userEmail,
            name: session.username,
            role: userData[0].roleName
        })

        Success_Response(res, 200, "token renew succesfully", 
            { 
                token : accessToken,
                info: {
                    userId: session.userId,
                    name: session.username,
                    role: userData[0].roleName
                }
            })
    } catch (error) {
        console.log(error);
        next(error);
    }    
}


export async function verify_Password_Token(req, res, next) {

    try {
        const { token } = req.query;     

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const [user] = await db 
            .select()
            .from(userInvites)
            .where(
                and(
                    eq(userInvites.token, tokenHash),
                    gt(userInvites.expiresAt, sql`NOW()`),
                    isNull(userInvites.usedAt)
                    )
            );
        
        if (!user) {
            return next(new Error_Response("Invalid or expired token"))
        }
        
        Success_Response(res, 200, "", {
            userId: user.userId
        })
    } catch (error) {
        console.log(error);        
        next(error)
    }
   
    
}


export async function reset_Password(req, res, next) {
     const {id, password} = req.body;

     try {
        await db.transaction( async(tx) => {
            const [userId] = await tx
                .select({
                    id: users.id
                })
                .from(users)
                .where(eq(users.id, id))
            

            if (!userId.id) {
                return next(new Error_Response("id invalid", 400))
            }

            const passwordHashed = await argon2.hash(password)

            await tx
                .update(users)
                .set({
                    password: passwordHashed,
                })
                .where(eq(users.id, userId.id)); 
                
            // await tx
            //     .delete(userInvites)
            //     .where(eq(userInvites.userId, userId.id))
        })
        Success_Response(res, 200,)
     } catch (error) {
        console.log(error);
        next(error)
     }
}

export async function forgot_Password(req, res, next) {
    const {email} = req.body;
    try {
        
        const userExisted = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);   

        if (userExisted.length === 0) {
            return res.status(200).json({
                success: true,
                message: "If the email exists, a reset link has been sent"
            });
        }

        const userData = userExisted[0];
        const {token, tokenHash} = generateResetToken();
        
        await db
            .update(userInvites)
            .set({ usedAt: sql`CURRENT_TIMESTAMP` })
            .where(eq(userInvites.userId, userData.id));

        await db
            .insert(userInvites)
            .values({
                userId: userData.id,
                token: tokenHash,
                expiresAt: sql`CURRENT_TIMESTAMP + INTERVAL 1 DAY`
            })


        await ForgotPasswordEmail({
            username: userData.username,
            resetLink: `http://localhost:5173/forgot-password-user?token=${token}`
        })


        Success_Response(res, 200, 
            "If the email exists, a reset link has been sent",
        )
    } catch (error) {
        console.log(error);
        next(error)        
    }
}