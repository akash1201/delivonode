const asyncHandler = require ('express-async-handler');
const Category = require('../models/Category')

exports.getCategories = asyncHandler ( async (req, res)=>{
   try{
           console.log('HII')
          let categories = await Category.find({});
          res.status(200).json({status : 200, data : categories})

   }catch(err){

             res.status(500).json({status : 500, data : []})
   }
})