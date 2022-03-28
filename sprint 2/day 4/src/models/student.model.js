const mongoose = require("mongoose")
//studentschema
const studentSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    rollId:{type:Number,required:true,unique:true},
    currentBatch:{type:String,required:true}
},
{
    timestamps:true,
    versionKey:false
});
    
//studentmodel
const Student = mongoose.model("student",studentSchema);

module.exports = Student;