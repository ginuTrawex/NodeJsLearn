import { Router } from "express";
import { getAllUsers, addUser, searchUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authValidate } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', authValidate, getAllUsers)
userRouter.post('/', authValidate, addUser)
userRouter.get('/:id', authValidate, searchUser)
userRouter.put('/:id', authValidate, updateUser)
userRouter.delete('/:id', authValidate, deleteUser)


export default userRouter;