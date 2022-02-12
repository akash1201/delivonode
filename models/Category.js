//import mongoose from 'mongoose';
const mongoose= require('mongoose')

const CategorySchema = mongoose.Schema({

          name : {
                    type : String,
                    required : true
          },
          metric : {
                    type : String,
                    required : true
          }

});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;