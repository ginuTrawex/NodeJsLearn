import { Router } from "express";
import { getAllUsers, addUser, searchUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getAllUsers)
userRouter.post('/', addUser)
userRouter.get('/:id', searchUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)


export default userRouter;