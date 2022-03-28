const express = require("express");
const connect = require("./configs/db")
const userController = require("./controller/user.controller")
const {register,login} = require("./controller/auth.controller")
const postController = require("./controller/posts.controller")
const app = express();
app.use(express.json());

app.use("/users", userController)
app.use("/register",register)
app.use("/login", login)
app.use("/posts",postController)


app.get("/", (req, res) => {
    return res.send("Port is running")
})

app.listen(4000, async () => {
    try {
        await connect();
        console.log("Listening at port 4000 ");
    } catch (err) {
        console.log(err.message)
    }
})