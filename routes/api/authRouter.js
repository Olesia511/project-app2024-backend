import express from "express";

import authCtrl from "../../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/signup", authCtrl.signup);

export default authRouter;
