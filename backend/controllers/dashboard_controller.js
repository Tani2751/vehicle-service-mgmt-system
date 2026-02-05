import { eq, sql } from "drizzle-orm";
import { db } from "../db.js";
import { garages, roles, userInvites, userRoles, users } from "../drizzle/schema.js";
import Success_Response from "../utilis/Success_Response.js";
import { generateResetToken } from "../utilis/GenerateResetToken.js";
import { InviteUserEmail } from "../services/resend.js";

export async function dashboardRoute(req, res, next) {

    Success_Response(res, 200, 'success', {
        users: [
            {name: "tanisgh", age: 22},
            {name: "suarbh", age: 23},
        ],
    })
}



export async function superAdmin_User_Metrics(req, res, next) {

    try {
         console.log(req.params, "req params");
         const { userId } = req.params;

        const [
            userCount
        ] = await Promise.all([
            db.select({ count: sql`COUNT(*)` }).from(users)
        ])
  
        Success_Response(res, 200, 'success', {
            users: [
                {name: "tanisgh", age: 22},
                {name: "suarbh", age: 23},
            ],
        })
    } catch (error) {
        console.log(error);
        next(error)   
    }   
}


export async function create_User(req, res, next) {

    const appUrl = process.env.DEV_APP_URL;

    const {username, email, phone, address, city, roleId, garageId} = req.body;
    try {
        let userExisted = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);
           
        if (userExisted.length > 0) {
            return next(new Error_Response("user with this email ID already exist!", 409))
        };

        await db.transaction(async (tx) => {
        const [user] = await tx
            .insert(users)
            .values({
                phoneNumber: phone,
                email,
                username,
                address,
                city,
                garageId
            }).$returningId();

            const userId = user;

            
            await tx
                .insert(userRoles)
                .values({                    
                    userId: userId.id,
                    roleId: roleId                
                })

            const {token, tokenHash} = generateResetToken()
            
            await tx.insert(userInvites).values({
                userId: userId.id,
                token: tokenHash,
                expiresAt: sql`CURRENT_TIMESTAMP + INTERVAL 1 DAY` // 24h
            });   

            await InviteUserEmail({
                to: email,
                username: username,
                resetLink: `http://localhost:5173/invite-user?token=${token}`,
            });
        })
        Success_Response(res, 200, "User created succesfully")
    } catch (error) {
        console.log(error);
        next(error)
    }    
}

export async function invite_User(req, res, next) {
    const token = req.param;
    
    try {
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}   