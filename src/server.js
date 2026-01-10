import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.PORT || 3000;
const baseUrl = process.env.APP_URL || 'http://localhost';

app.listen({ port, baseUrl }, () => {
    console.log(`Server started at : \n => APP_URL : ${baseUrl}:${port}`)
})