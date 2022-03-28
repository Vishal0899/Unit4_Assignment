const express = require("express");
const connect = require("./config/db");
const app = express();
app.use(express.json())

const userController = require("./controller/user.controller")

app.use("/users",userController)

app.get("/",(req,res)=>{
    return res.send("Port is running")
})


app.listen(3000, async (req, res) => {
  try {
    await connect();
    console.log("Listining at port 3000");
  } catch (err) {
    console.log(err.message);
  }
});
