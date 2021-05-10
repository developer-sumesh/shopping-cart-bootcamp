const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware');

// Display all the products 
router.get('/products',async (req,res)=>{
    try{ 
    const products = await Product.find({});
    res.render('products/index',{products});
    } catch (e){
        console.log("Something Went Wrong");
        req.flash('error','cannot find Products');
        res.render('error');
    }
})

// Get the form for new product
router.get('/products/new',isLoggedIn,(req,res)=>{

    res.render('products/new');
})

// Create new products

router.post('/products',isLoggedIn,async(req,res)=>{
    // console.log(req.body.product)
    try{

        await Product.create(req.body.product);
        req.flash('success','Product Created Sucessfully');
        res.redirect('/products');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','cannot create Products,something went wrong');
        res.render('error');
    }
})

// show particular product
router.get('/products/:id',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate('reviews');
        console.log(product);
        res.render('products/show',{product});
        // res.render('products/show',{product,msg:req.flash('success')}); instead of this local memomory message
    }
    catch(e){
        console.log(e.message);
        req.flash('error','cannot find product');
        res.redirect('/error');
    }
})

// Get the edit form
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    
    const product=await Product.findById(req.params.id);

    res.render('products/edit',{product});
})

// update the particular product
router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    await Product.findByIdAndUpdate(req.params.id,req.body.product);
    req.flash('success','Updated sucessfully')
    res.redirect(`/products/${req.params.id}`);
})

// Delete a particular product
router.delete('/products/:id',isLoggedIn,async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    
    res.redirect('/products');
}) 

// Creating a New Comment on a product
router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    
    const product = await Product.findById(req.params.id);
    
    const review = new Review({
        user:req.user.username,
        ...req.body
    });

    product.reviews.push(review);
    
    await review.save(); 
    await product.save();

    console.log(req.body);
    // res.send("go to review");

    res.redirect(`/products/${req.params.id}`);
})

router.get('/error',(req,res)=>{
    res.status(500).render('error');
})

module.exports = router;