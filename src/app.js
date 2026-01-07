import express from "express";
import homeRouter from "./routes/home.router.js";
import userRouter from "./routes/user.router.js";

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('started');
});

app.use('/home', homeRouter);
app.use('/api/users', userRouter);

export default app;