const mongoose = require("mongoose")

const submissionSchema=new mongoose.Schema({
    evaluationId:{type:mongoose.Schema.Types.ObjectId, ref:"evaluation", required:true},
    studentId:{type:mongoose.Schema.Types.ObjectId, ref:"students", required:true},
    Marks:{type:Number,required:true}
    
},
{
    timestamps:true,
    versionKey:false
})
    
    
//submitionmodel
const Submission = mongoose.model("submission",submissionSchema);

module.exports = Submission;