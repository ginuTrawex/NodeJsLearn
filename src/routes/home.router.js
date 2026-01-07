import { Router } from "express";


const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.send('welcome to node js');
})


export default homeRouter;