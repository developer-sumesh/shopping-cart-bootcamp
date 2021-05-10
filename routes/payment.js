const express = require('express');
const routes = express.Router();

routes.get('/products/payment',(req,res)=>{
    res.render(payment/payment);
})

module.exports = routes;