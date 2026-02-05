import z from "zod";

export const login_schema = z.object({
    email: z
        .string()
        .email(),

    password: z 
        .string()
        .min(6, "password must be atleast 6 characters long")
        .max(16, "password can be at most 16 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[@$%*&!#?]/, "Password must contain at least one number")
})