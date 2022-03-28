const express = require("express");
const mongoose = require("mongoose");
const connect = require("./configs/db");

const User = require("./models/user.model");
const Student = require("./models/student.model");
const Batch = require("./models/batch.model");
const Evaluation = require("./models/evaluation.model");
const Submission = require("./models/submission.model");

const app = express();

app.use(express.json());



const userController = require("./controllers/user.controller");
const studentsController = require("./controllers/student.controller");
const batchController = require("./controllers/batch.controller");
const evaluationController = require("./controllers/evaluation.controller");
const submissionController = require("./controllers/submission.controller");


app.use("/users",userController);
app.use("/students",studentsController);
app.use("/batches",batchController);
app.use("/evaluations",evaluationController);
app.use("/submissions",submissionController);


app.post("/submissions",async(req,res)=>{
    try{
        const user = await Student.create(req.body);
        return res.status(200).send(user);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});

app.get("/maxmarks",async(req,res)=>{
        try{
            const batch = await Submission.findById().sort({Marks:-1}).limit(1).populate({path:"evaluationId", select:{dateofevaluation:1}}).lean().exec();
            return res.send(batch);
        }catch(err){
            return res.status(500).send(err.message); 
        }
});
    
app.listen(4000,async()=>{
    try{
        await connect();
        console.log("Listening at port 4000");
    }catch(err){
        console.log(err);
    }
});

