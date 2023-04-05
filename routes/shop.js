const path=require('path')
const express=require('express');
const router=express.Router();
const productcontroller=require('../controller/products')

router.get('/',productcontroller.getProduct)
module.exports=router;