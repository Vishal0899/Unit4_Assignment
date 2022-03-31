const express = require("express")
const connect = require("./config/db")
const productController = require("./controllers/product.controller")

const app = express();
app.use(express.json())

app.get("", (req, res) =>{
    return res.send("Port is Running")
})
app.use("/products",productController)
app.listen(5000, async () => {
    try {
        await connect();
        console.log("Listening at port 5000")
    } catch (error) {
        return res.send(error.message)
    }
})