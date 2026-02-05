
import { db } from "../db.js"
import Success_Response from "../utilis/Success_Response.js"
import jwt from "jsonwebtoken"
import { users, userRoles, sessions, roles } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function authenticate({user, req, res}) {   
    
    console.log(user, "user");
    
    try {   

        const userWithRoles = await db
                .select({
                    username: users.username,
                    email: users.email,
                    roleName: roles.name,                    
                })
                .from(users)
                .innerJoin(userRoles,
                    eq(users.id, userRoles.userId)
                 )
                .innerJoin(roles,
                    eq(userRoles.roleId, roles.id)
                 )
                .where(eq(users.id, user.id))
                 
            console.log(userWithRoles, "user with roles");
            
            const session = await db
                .insert(sessions)
                .values({
                    userId: user.id,
                    userAgent: req.headers['user-agent'],
                    ip: req.clientIp,
                })

            
            
            const accessToken = createAccessToken({
                id: user.id,
                name: user.username,
                email: user.email,
                role: userWithRoles[0].roleName
            })

            const refreshToken = createRefreshToken({
                id: session[0].insertId,
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/"
            })

            Success_Response(res, 201, "user created succesfully", {
                    accessToken,
                    user: {
                        name: user.username,
                        userId: user.id,
                        role: userWithRoles[0].roleName
                    }                    
            })
    } catch (error) {
        console.log(error);        
    }    
};



export function createAccessToken({id, email, role, name}) {
    try {
       const token = jwt.sign(
            {id, email, role, name},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
        );    
        return token; 
    } catch (error) {
        console.log(error, "error while generating access token");
        
    }    
}


export function createRefreshToken({id}) {
    try {
        const token = jwt.sign(
            {id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRE}
        );
        return token; 
    } catch (error) {
        console.log(error);        
    }    
}