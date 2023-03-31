const express=require('express');

const router=express.Router();

//filtering when two routes have same address if they have different method 
//if all routes here are following some common address then we can use filtering here like /admin/add-product let suppose all routes here are starting with /admin then we can add admin at app.js file where we are calling this
router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">submit</input></form>')
})
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
     res.redirect('/');

})

module.exports=router;