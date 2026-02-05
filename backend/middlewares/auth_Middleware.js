
import jwt from "jsonwebtoken";
import Error_Response from "../utilis/Error_Response.js";

export async function auth_Middleware(req, res, next) {     
    try {

        if (req.method === "OPTIONS") {
            return next();
        }
        
        const authHeader = req?.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1];
        console.log("Auth Middleware running");
        
        if (!token) {
            console.log("user2 verified");
           return next(new Error_Response("No token provided", 401))
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
              return next(new Error_Response("Invalid or expired token", 401))
            }
            req.user = user;
             console.log("user verified");
           return next()
        })
    } catch (error) {       
        return next(error)        
    }
}