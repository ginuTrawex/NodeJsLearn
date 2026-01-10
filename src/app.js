import express from "express";
import homeRouter from "./routes/home.router.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('started');
});

app.use('/home', homeRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

export default app;