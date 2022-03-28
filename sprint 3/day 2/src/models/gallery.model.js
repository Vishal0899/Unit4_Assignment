const mongoose = require("mongoose")

const gallerySchema = mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    gpic : [{type:String,required:true}]
})

const Gallery = mongoose.model("gallery",gallerySchema)

module.exports = Gallery;