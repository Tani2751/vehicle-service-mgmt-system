import { Router } from "express";
import { schema_Validator } from "../middlewares/schema_Validator.js";
import { register_schema } from "../validators/register_Schema.js";
import { forgot_Password, issueToken, loginUsers, logoutUser, registerUsers, reset_Password, verify_Password_Token } from "../controllers/auth_controller.js";
import { login_schema } from "../validators/login_Schema.js";


const router = Router();

router.post("/register", schema_Validator(register_schema), registerUsers)
router.post('/login', schema_Validator(login_schema), loginUsers)
router.get('/logout/:id', logoutUser)
router.get('/refresh', issueToken)
router.get("/verify-invite", verify_Password_Token)
router.post("/reset-password", reset_Password)
router.post("/forgot-password", forgot_Password)



// router.post("/register", schema_Validator(register_schema),  (req, res) => {
//   console.log(req.body);
//   res.json({ message: "POST working" });
// });

export default router