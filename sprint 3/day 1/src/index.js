const express = require("express");
const app = express();
const connect = require("./configs/db");

app.use(express.json());

const userController = require("./controllers/user.controller")

app.use("/users",userController);

app.get("/",(req,res)=>{
    return res.send("Hello");
})


app.listen(4002,async ()=>{
    try {
        await connect();
        console.log("Listening at 4002");
    } catch (err) {
        console.log(err.message);
    }
})