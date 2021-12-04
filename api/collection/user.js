
const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

    userName :{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: [true,'Email is unique'],
    },
    password:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
    },
    DOB:{
        type:String,
        required: true,
    },
    Qualification:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    }

})
module.exports=mongoose.model('User',userSchema);