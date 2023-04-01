const path=require('path');

const rootdir=require('../util/path')
const express=require('express');

const router=express.Router();
const products=[];

//filtering when two routes have same address if they have different method 
//if all routes here are following some common address then we can use filtering here like /admin/add-product let suppose all routes here are starting with /admin then we can add admin at app.js file where we are calling this
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','add-product.html'))
})
router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title});
     res.redirect('/');

})

exports.routes=router;
exports.products=products;