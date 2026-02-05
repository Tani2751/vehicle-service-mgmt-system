import { Router } from "express";
import {  create_User,  dashboardRoute, invite_User, superAdmin_User_Metrics } from "../controllers/dashboard_controller.js";
const router = Router();


router.get("/", dashboardRoute)
// get super admin's user section's dashboard data - widget, charts and table data.
router.get("/userSection/:userId", superAdmin_User_Metrics)
router.post('/createUser', create_User)
router.get("invite-user", invite_User)

export default router;