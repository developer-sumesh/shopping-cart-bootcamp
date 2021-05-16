const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// router.get('/fakeUser',async (req,res) => {
    
//     const user= new User({email:'sumesh@gmail.com',username:'sumesh'});
//     const newUser = await User.register(user,'sumesh@123');
//     res.send(newUser);
// }) 

router.get('/register',async (req,res)=>{
    res.render('auth/signup');
})
// register the user
router.post('/register',async(req,res)=>{
    try{
        const user = new User({username:req.body.username,email:req.body.email,type:req.body.type});
        const newUser = await User.register(user,req.body.password);
        console.log(newUser);
        req.flash('success','Registered Sucessfully');
        res.redirect('/products');
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

// login the router
router.get('/login',async(req,res)=>{
    res.render('auth/login');
})

router.post('/login',
    passport.authenticate('local',
        {     
            failureRedirect: '/login',
            failureFlash: true 
        }
    ),(req,res)=>{
        req.flash('success',`Welcome back ${req.user.username}`);
        res.redirect('/products');
});

// logout the route
router.get('/logout',(req,res)=>{
    
    req.logout();
    req.flash('success','Logged Out Successfully');
    res.redirect('/login');
})


module.exports = router;