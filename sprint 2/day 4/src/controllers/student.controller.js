const express = require("express")
const router = express.Router();

const Student = require("../models/student.model")

router.get("/",async(req,res)=>{
    try{
        const student=await Student.find().lean().exec();
        return res.status(200).send(student);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;