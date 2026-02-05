import Error_Response from "../utilis/Error_Response.js";



export const schema_Validator = (schema) => {   
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(new Error_Response(result.error?.issues[0].message, 400))
        }
        next();
    }
}