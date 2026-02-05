import express from "express";
import cors from "cors";
import authRoute from "./routes/auth_route.js"
import { auth_Middleware } from "./middlewares/auth_middleware.js";

import cookieParser from "cookie-parser";
import requestIp from "request-ip";
import error_Handler from "./middlewares/error_Handler.js";
import superAdminDashboard from "./routes/dashborad_route.js"
import basicDetails from "./routes/basicDetails.js"

const app = express();
   app.use(cors({
      origin:"http://localhost:5173",
      credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw())

app.use('/api/v1/auth', authRoute)
app.use("/api/v1/info", auth_Middleware, basicDetails);
app.use("/api/v1/SupAdminDashboard", auth_Middleware, superAdminDashboard);

// error handler middleware
app.use(error_Handler);

 app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
 })