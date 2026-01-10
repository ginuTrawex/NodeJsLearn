import { Router } from "express";
import { createToken } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/', createToken);

export default authRouter;