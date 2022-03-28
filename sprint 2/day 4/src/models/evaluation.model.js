const mongoose = require("mongoose")

//evaluationschema
const evaluationSchema=new mongoose.Schema({
    dateofevaluation:{type:String,required:true},
    instructorId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    batchId:{type:mongoose.Schema.Types.ObjectId, ref:"batch", required:true}
},
{
    timestamps:true,
    versionKey:false
})

//evalution model--
const Evaluation = mongoose.model("evaluation",evaluationSchema);

module.exports = Evaluation;