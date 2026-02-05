import z from "zod";


export const register_schema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "name is too short!, it must atleast 3 characters long")
        .max(16, "name must be at most 16 charaters long"),

    email: z
        .string()
        .email("invalid email"),

    password: z
        .string()
        .min(6, "password must be atleast 6 characters long")
        .max(16, "password can be at most 16 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[@$%*&!#?]/, "Password must contain at least one number"),

    confirmPassword: z
        .string()
        .min(6, "password must be atleast 6 characters long")
        .max(16, "password can be at most 16 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[@$%*&!#?]/, "Password must contain at least one number"),
        
})