import Contact from "../models/contactModel.js"
export const userContactController=async(req,res)=>{
  try {
    const {name,email,subject,message,location}=req.body;
    if(!name || !email || !subject || !message || !location){
      return res.status(400).json({error:"Please fill all the fields"})
    }
    // check if user already exists
    // const existingContact=await Contact.findOne({email});
    // if(existingContact){
    //   return res.status(200).json({success:false,message:"Contact already exists"})
    // }
    // create new contact
    const newContact=await new Contact({
      name,
      email,
      subject,
      message,
      location
    })
    // save contact
    // @ save contact
    await newContact.save();
    res.status(201).json({success:true,
    message:"Message and location send successfully",newContact})
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message and location' });
  }
}

export const getAllContacts=async(req,res)=>{
  try{
    const contacts=await Contact.find({}).sort({createdAt:-1});
    res.status(200).json({success:true,contacts})
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Failed to fetch contacts"})
  }
}