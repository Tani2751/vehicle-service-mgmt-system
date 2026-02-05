import { Router } from "express";
import { get_Roles, sideBar_GarageList, user_Data } from "../controllers/basicDetails.js";


const router = Router();

router.get("/me", user_Data);
router.get("/sideBarGarargeList", sideBar_GarageList);
router.get("/getRoles", get_Roles);


export default router;