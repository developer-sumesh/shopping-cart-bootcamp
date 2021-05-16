const express = require('express');
const routes = express.Router();
const uniqid = require('uniqid');
const jsSHA = require('jssha');
const request = require('request');
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');
const Order = require('../models/order');

routes.post('/payment_gateway/payumoney',isLoggedIn,(req,res)=>{
    req.body.txnid = uniqid.process()
    req.body.email = req.user.email;
    req.body.firstname = req.user.username;
    
    //Here save all the details in pay object 
    const pay = req.body;
    const hashString = process.env.MERCHANT_KEY //store in in different file
        + '|' + pay.txnid
        + '|' + pay.amount 
        + '|' + pay.productinfo 
        + '|' + pay.firstname 
        + '|' + pay.email 
        + '|' + '||||||||||'
        + process.env.MERCHANT_SALT //store it in different file
    console.log(`process.env.MERCHANT_KEY = ${process.env.MERCHANT_KEY}  process.env.MERCHANT_SALT = ${process.env.MERCHANT_SALT} ${hashString}`);
    const sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString);
    
    //Getting hashed value from sha module
    const hash = sha.getHash("HEX");
    
    //We have to additionally pass merchant key to API
    
    pay.key = process.env.MERCHANT_KEY //store in in different file;
    pay.surl = 'http://localhost:3000/payment/success';
    pay.furl = 'http://localhost:3000/payment/failure';
    pay.hash = hash;
    
    //Making an HTTP/HTTPS call with request
    request.post({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        url: 'https://test.payu.in/_payment', //Testing url
        form: pay
    }, function (error, httpRes, body) {
        if (error) 
         res.send({
            status: false, 
            message:error.toString()
        });
        if (httpRes.statusCode === 200) {
            res.send(body);
        } 
        else if (httpRes.statusCode >= 300 && 
        httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
        }
    })
});

routes.post('/payment/success',isLoggedIn,async (req,res)=>{
    try{
        const order={
            txnid: req.body.txnid,
            amount: req.body.amount,
            orderedProducts: req.user.cart
        }
        const placedOrder = await Order.create(order);
        
        req.user.orders.push(placedOrder);
        console.log(req.user);
        await req.user.save();
        try{
        await User.findByIdAndUpdate(req.user._id,{$unset:{cart:""}});
        console.log("cart deleted successfully");
        }
        catch(e){
            console.log("pull request error");
        }
        req.flash('success','Your order haas been successfully placed.Thanks for shopping with us ');
        res.redirect(`/user/${req.user._id}/me`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot placed the order at this moment.Please try again later!');
        res.render('error');
    }
})

routes.post('/payment/failure',(req,res)=>{
    req.flash('error', `Your Payment Failed.Try again after sometime ${req.body}`);
    res.render('error');
})

module.exports = routes;