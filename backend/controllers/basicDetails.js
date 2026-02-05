import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { garages, roles, userRoles, users } from "../drizzle/schema.js";
import Success_Response from "../utilis/Success_Response.js";


export async function user_Data(req, res, next) {

    
    try {        
        const [userData] = await db
                .select({
                    username: users.username,
                    email: users.email,
                    roleName: roles.name,
                    userId: users.id
                    })
                .from(users)
                .innerJoin(
                    userRoles, 
                    eq(users.id, userRoles.userId)
                )
                .innerJoin(
                    roles,
                    eq(userRoles.roleId, roles.id))
                .where(eq(users.id, req.user.id));
       
        Success_Response(res, 200, "user Data", {userData})
    } catch (error) {
        console.log(error);        
        next(error);
    }    
}



export async function sideBar_GarageList(req, res, next) {
    try {
        const garageData = await db.select().from(garages);
        Success_Response(res, 200, "success", {
            garageData
        });
    } catch (error) {
        console.log(error);        
        next(error);
    }
    
}


export async function get_Roles(req, res, next) {
    try {
        const rolesData = await db.select().from(roles);
        Success_Response(res, 200, "success", {
            rolesData
        }) 
    } catch (error) {
        console.log(error);        
        next(error);
    }
    
}