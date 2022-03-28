const express = require("express");
const userController = require("./controller/user.controller");

const app = express();
app.use(express.json());

app.use("/user",userController);

app.get("", (req, res) => {
    return res.send("Port is working");
})

module.exports = app;