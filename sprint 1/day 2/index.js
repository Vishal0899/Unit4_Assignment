const express = require("express");

const app = express();

// console.log(app);

app.get("",function(req,res){
    res.send("hello");
});

app.get("/books", function(req,res){
    res.send(`{NAME:"The Help", AUTHORS:"Kathryn Stockett"},
             {NAME:"A Game Of Thrones", AUTHORS:"George R.R. Martin"},
             {NAME:"A Court Of Mist And Fury", AUTHORS:"Sarah J. Maas"},
             {NAME:"The Last Olympian", AUTHORS:"Rick Riordan"}`)
            });


app.listen(5000, () => {
    console.log("listening on port 5000");
});