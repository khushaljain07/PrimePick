const path=require('path')
const express=require('express');
const router=express.Router();
const rootdir=require('../util/path')
const adminData=require('./admin')
router.get('/',(req,res,next)=>{

 const product=adminData.products;
    res.render('shop',{prods:product,docTitle:'shop',path:'/'});


})
module.exports=router;