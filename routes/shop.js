const express=require('express');
const router=express.Router();
router.get('/',(req,res,next)=>{
 
    res.send('<h1>hello from express</h1>');//res.setHeader,res.write

})
module.exports=router;