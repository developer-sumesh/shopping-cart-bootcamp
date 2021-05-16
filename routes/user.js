const express = require('express');
const routes = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');
const Product = require('../models/product');
const router = require('./product');

routes.get('/user/:id/me',isLoggedIn,async(req,res)=>{
    try{
        const userInfo = await User.findById(req.params.id).populate({
            path:'orders',
            populate:{
                path: 'orderedProducts',
                model: 'Product'
            }
        })
        console.log(userInfo);
       res.render('users/myorders',{orders:userInfo.orders}); 
    }
    catch(e){
        console.log(e.message);
        req.flash('error', 'Cannot Place the Order at this moment.Please try again later!');
        res.render('error');
    }
})

module.exports = routes;