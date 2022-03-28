const app = require("./index");

const connect = require("./configs/db");

app.listen(4003 , async (req,res)=>{
    try {
        await connect()
        console.log("Listining at 4003");
    } catch (err) {
        return res.send(err.message);
    }
})