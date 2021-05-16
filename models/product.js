const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String
    },
    addBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review' 
        }
    ]
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;