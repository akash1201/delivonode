import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import jwt from 'jsonwebtoken';
import Product from '../models/Products.js';

const addCategory = asyncHandler(async (req, res)=>{
          let category = await Category.create(req.body);
          res.json(category);

});

const addProduct = asyncHandler (async(req, res)=>{
  try{
          let token = req.headers.authorization.split(' ')[1]
          let userid = jwt.verify(token, process.env.JWT_SECRET)
          console.log(userid.id);

          let obj = {
                    name : req.body.name,
                    image : req.body.image,
                    category : req.body.category,
                    vendorId : userid.id,
                    price : req.body.price,
                    qty : req.body.qty,
                    unit : req.body.unit
          }

          let product = await Product.create(obj);
          res.json({status : 200, msg : 'Added', data : product});
  }catch(err){
            console.log(err);
            res.json({status:500, msg : err.message});
  }
});

const getProducts = asyncHandler(async (req, res)=>{
    try{
          let token = req.headers.authorization.split(' ')[1];
          let userid = jwt.verify(token, process.env.JWT_SECRET);
          let categoryId = req.params.categoryId;

          let products = await Product.find({vendorId : userid.id, category : categoryId});
          res.json({status : 200, msg : "success", data : products });

    }catch(err){
              res.json({status : 500, msg : err.message,data : []});
    }
});

const updateProduct = asyncHandler (async(req, res)=>{
          try{
          let token = req.headers.authorization.split(' ')[1];
          let userid = jwt.verify(token, process.env.JWT_SECRET);
             let exists = await Product.findOne({vendorId : userid.id, _id : req.params.productId});
             if(exists){
                    
                    exists.name = req.body.name || exists.name;
                    exists.price = req.body.price || exists.price;
                    exists.qty = req.body.qty || exists.qty;
                    exists.unit = req.body.unit || exists.unit;
                    exists.discount = req.body.discount || exists.discount;

                    let product = await exists.save();

                    res.json({status : 200, msg : "Updated", data : product});

             }else{
                       res.status(404).json({status : 404, msg : 'Product not found'});
             }
          }catch(err){
                    res.json({status : 500, msg : err.message});
          }
});

const deleteProduct = asyncHandler (async (req, res)=>{
   try{
          let token = req.headers.authorization.split(' ')[1];
          let userid = jwt.verify(token, process.env.JWT_SECRET);

          let product = await Product.findOne({vendorId : userid.id, _id : req.params.productId});
          if(product){
             await Product.deleteOne({_id : req.params.productId});
             res.json({msg : 'Deleted', status : 200});
          }else{
                    res.status(404).json({status : 404, msg : 'Product not found'});
          }
   }catch(err){
             res.status(400).json({msg : err.message, status : 500});
   }
});

export {addCategory,addProduct, getProducts,updateProduct,deleteProduct}