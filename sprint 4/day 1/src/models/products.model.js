const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    // userName: { type: String, required: true },
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    title: { type: String, required: true},
    body : {type:String,required:false},
    price : {type:Number,required:true}
}, {
    versionKey: false,
    timestamps : true
})

const Product = mongoose.model("product",productSchema)

module.exports = Product 