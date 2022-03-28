const mongoose = require("mongoose")

//bathcschema
const batchSchema=new mongoose.Schema({
    batchname:{type:String,required:true,unique:true},
    studentId:[{type:mongoose.Schema.Types.ObjectId, ref:"student", required:true}],
},
{
    timestamps:true,
    versionKey:false
})

//batchmodel

const Batch = mongoose.model("batch",batchSchema);

module.exports = Batch;
