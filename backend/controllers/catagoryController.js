import slugify from "slugify";
import Category from "../models/catagoryModel.js";




// @ create catagory
export const createCatagoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }
    // check if catagory already exists
    const existingCatagory = await Category.findOne({ name });
    if (existingCatagory) {
      return res.status(200).send({
        success: false,
        message: "Catagory already exists",
      });
    }
    // create new catagory
    const catagory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Catagory created successfully",
      catagory,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in catagory",
      error: error.message,
    });
  }
};


// @ update catagory
export const updateCatagoryController=async(req,res)=>{
  try {
    const {name}=req.body;
    const {id}=req.params;
    const catagory=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({
      success: true,
      message: "Catagory updated successfully",
      catagory,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in updating catagory",
      error: error.message,
    });
    
  }
}


// @ get all catagory
export const getAllCatagoryController=async(req,res)=>{
  try {
    const getAll=await Category.find({});
    if (!getAll) {
      return res.status(401).send({
        success: false,
        message: "Record not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All catagories fetched successfully",
      getAll,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in Getting catagory",
      error: error.message,
    });
  }
}


// @ get by id catagory
export const getByIdCatagoryController=async(req,res)=>{
  try {
    const getById=await Category.findOne({slug:req.params.slug});
    if (!getById) {
      return res.status(401).send({
        success: false,
        message: "Record not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Catagory fetched successfully",
      getById,
    });

  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "error in getting single catagory",
      error: error.message,
    });
  }
}


// @ delete catagory
export const deleteCatagoryController=async(req,res)=>{
  try {
    const {id}=req.params;
    const deleteData=await Category.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(401).send({
        success: false,
        message: "Record not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Delete successfully",
      deleteData,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in Delete catagory",
      error: error.message,
    });
  }
}
