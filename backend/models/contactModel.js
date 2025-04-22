import mongoose from "mongoose"

const contactSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  subject:{
    type:String,
    required:true,
    trim:true,
  },
  message:{
    type:String,
    required:true,
    trim:true,
  },
  location:{
    lat:String,
    lng:String,
  },
},{timestamps:true})

export default mongoose.model('Contact',contactSchema)