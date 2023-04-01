const path=require('path')
const express=require('express');
const router=express.Router();
const rootdir=require('../util/path')
const adminData=require('./admin')
router.get('/',(req,res,next)=>{

 console.log(adminData.products[0].title)
    // the problem with this type of sharing is it share across all users. if you log in with different machine or different browser it inherit the value 
    //this is very very rearly use or actually we will never implement this.
    res.sendFile(path.join(rootdir, 'views','shop.html'));//

})
module.exports=router;