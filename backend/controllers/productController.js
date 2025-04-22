// import { count } from "console";
import Product from "../models/productModel.js";
import Category from "../models/catagoryModel.js";
import fs from "fs";
import slugify from "slugify";
export const createProductController=async(req,res)=>{
  try {
    const {name,description,price,catagory,quantity,oldPrice}=req.fields;
    const {photo}=req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !description:
        return res.status(400).json({ message: "Description is required" });
      case !price:
        return res.status(400).json({ message: "Price is required" });
      case !oldPrice:
        return res.status(400).json({ message: "Old Price is required" });
      case !catagory:
        return res.status(400).json({ message: "Catagory is required" });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).json({
          message: "Photo is required and should be less than 1mb",
        });
    }
    const products = new Product({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    const product = await products.save();
    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

// @ get all products
export const getProductController=async(req,res)=>{
  try {
    const products=await Product.find({}).populate("catagory").select("-photo").limit(12).sort({createdAt:-1});
    res.status(200).json({
      success:true,
      countTotal:products.length,
      message:"All Products fetched successfully",
      products
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

// @ get single product
export const getSingleProductController=async(req,res)=>{
  try {
    const product=await Product.findOne({slug:req.params.slug}).select("-photo").populate("catagory");
    res.status(200).json({
      success:true,
      message:"Single Product fetched successfully",
      product,
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// @ update product
export const updateProductController=async(req,res)=>{
  try {
    const {name,oldPrice,description,price,catagory,quantity,shipping}=req.fields;
    const {photo}=req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !description:
        return res.status(400).json({ message: "Description is required" });
      case !price:
        return res.status(400).json({ message: "Price is required" });
      case !oldPrice:
        return res.status(400).json({ message: "Old Price is required" });
      case !catagory:
        return res.status(400).json({ message: "Catagory is required" });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).json({
          message: "Photo is required and should be less than 1mb",
        });
    }
    const products=await Product.findByIdAndUpdate(req.params.pid,{
      ...req.fields,
      slug:slugify(name),
    },{
      new:true
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    const product = await products.save();
    res.status(200).json({
      success:true,
      message:"Product updated successfully",
      product
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

// @ delete product
export const deleteProductController=async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success:true,
      message:"Product deleted successfully",
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const productPhotoController=async(req,res)=>{
  try {
    const product=await Product.findById(req.params.pid).select("photo");
    if(product.photo.data){
      res.set("Content-Type",product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(404).json({
      success:false,
      message:"Photo not found"
    })

  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

export const productCountController=async(req,res)=>{
  try {
    const total=await Product.find({}).estimatedDocumentCount();
    res.status(200).json({
      success:true,
      count:total,
      message:"Total products count fetched successfully"
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const productListController=async(req,res)=>{
  try {
    const perPage=8;
    const page=req.params.page?req.params.page:1;
    const products=await Product.find({}).select("-photo").populate("catagory").limit(perPage).skip((page-1)*perPage).sort({createdAt:-1});
    res.status(200).json({
      success:true,
      message:"Products list fetched successfully",
      products,
      currentPage:page,
      perPage,
      totalProducts:products.length
    })  
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

// @ similar product
export const relatedProductController=async(req,res)=>{
  try {
    const {pid,cid}=req.params;
    const products=await Product.find({
      catagory:cid,
      _id:{$ne:pid}
    }).limit(3).populate("catagory").select("-photo").sort({createdAt:-1});
    res.status(200).json({
      success:true,
      message:"Related products fetched successfully",
      products
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

// product categories controllers

export const productCategoryController=async(req,res)=>{
  try {
    
    const category=await Category.findOne({slug:req.params.slug}).select("-photo");
    const products=await Product.find({catagory:category._id}).populate("catagory").select("-photo");
    res.status(200).json({
      success:true,
      message:"Products fetched successfully",
      category,
      products
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}