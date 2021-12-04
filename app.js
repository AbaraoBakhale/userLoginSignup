const express = require('express');
const app=express();

const userRoute=require("./api/route/user");

const mongoose=require("mongoose");
const bodyParser=require("body-parser");

mongoose.connect('mongodb+srv://users:users@cluster0.8hkmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log("connection failed...");
});
mongoose.connection.on("connected",connected=>{
    console.log("Connected Database!");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/Admin',userRoute);


 app.use((req,res,next)=>{
        res.status(404).json({
            message:"Url Not Found"
        })
    })




module.exports=app;




// mongodb+srv://admin:<password>@cluster0.8hkmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority.