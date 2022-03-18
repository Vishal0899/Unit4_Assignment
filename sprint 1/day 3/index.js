const express = require("express");

const app = express();

app.get("/books", allBooks , (req,res) =>{
    return res.send("Fetching all books");
})


app.get("/books/:name", Sbook() , (req,res) => {
 
    return res.send({bookName : req.name});
})


function allBooks(req,res,next){
    console.log("Fetching all books");
    next();
}

function Sbook(){
    return function singlebook(req,res,next){
        req.name = req.params.name;
        next();
    }
}

app.listen(1793,function(){
    console.log("Listening on port 1793");
});