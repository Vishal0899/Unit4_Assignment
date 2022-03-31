const express=require("express")
const mongoose=require("mongoose")

const app=express();
app.use(express.json());

const connect=()=>{
     return mongoose.connect("mongodb://localhost:27017/library")
    
    }


  // Section schema
const sectionSchema=new mongoose.Schema({
      section_no:{type:Number,required:true}
  })

//   section model
const Section=mongoose.model("section",sectionSchema);

// crud of section
app.post("/section",async(req,res)=>{
    try {
        let section=await Section.create(req.body) 
        return res.send(section)
    } 
    catch (error) {
       return res.send({Error:error})
    }
})



// Author Schema
const authorSchema=new mongoose.Schema({
     first_name:{type:String,required:true},
     last_name:{type:String,required:true}
})

// Author model
const Author=mongoose.model("author",authorSchema);

// crud of author
app.post("/author",async(req,res)=>{
    try {
        let author=await Author.create(req.body)
        return res.send(author)
    } 
    catch (error) {
      return  res.send({Error:error})
    }
})


// books schema
const booksShema=new mongoose.Schema({
    book_name:{type:String,required:true},
    body:{type:String,required:true},
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true
    },
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true
    }
})

// books model
const Books=mongoose.model("book",booksShema)

// crud for books
app.post("/books",async(req,res)=>{
    try {
        let book=await Books.create(req.body)
        return res.send(book)
    } 
    catch (error) {
        return  res.send({Error:error})
    }
})

app.get("/books/:id",async (req,res)=>{
    try {
        let data=await Books.find({authorId:{$eq:req.params.id}}).populate("authorId").populate("sectionId")
         return res.send(data).lean().exec()
    } 
    catch (error) {
        return  res.send({Error:error})
    }
})

app.get("/books/section/:id",async (req,res)=>{
    try {
        let data=await Books.find({sectionId:{$eq:req.params.id}}).populate("authorId").populate("sectionId")
      return res.send(data);
    } 
    catch (error) {
        return  res.send({Error:error})
    }
})

app.get("/books/section/:secid/author/:id",async (req,res)=>{
    try {
        let data=await Books.find({$and:[{authorId:{$eq:req.params.id}},{sectionId:{$eq:req.params.secid}}]}).populate("authorId").populate("sectionId").lean().exec()
        return res.send(data)
    } 
    catch (error){
        return  res.send({Error:error})
    }
})


 









app.listen(5000,async ()=>{
  try {
      await connect()
      console.log("listning on 5000")
  } catch (error) {
      console.log(error)
  }
})