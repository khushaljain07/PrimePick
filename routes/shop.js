const path=require('path')
const express=require('express');
const router=express.Router();
router.get('/',(req,res,next)=>{
 //here we use sendfile insted of send because after going to that path we are rendering our html code
    res.sendFile(path.join(__dirname,'../', 'views','shop.html'));//res.setHeader,res.write

})
module.exports=router;