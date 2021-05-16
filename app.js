if(process.env.Node_Env !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');

const productRoutes = require('./routes/product');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart')
const paymentRoute = require('./routes/payment');
const userRoutes =  require('./routes/user')

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// console.log(process.env.SECRET);
// console.log(process.env.API_KEY);

mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err)=>{
        console.log("OH no error");
        console.log(err);
    })

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

const sessionConfig ={
    secret:'bettersecret',
    unsave: true,
    resave: true,
    saveUninitialized: true,
}

app.use(session(sessionConfig));
app.use(flash());

// Intializing the passport and sessions for storing the users info
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success =req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser=req.user;
    next();
})
// seedDB();

app.get('/',(req,res)=>{
    res.render("index");
})
app.use(methodOverride('_method'));

app.use(productRoutes);
app.use(authRoute);
app.use(cartRoute);
app.use(paymentRoute);
app.use(userRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log("server has Started at port 3000");
})
