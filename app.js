const http =require('http');

const express=require('express');
 const adminRoutes=require('./routes/admin')
 const shoproutes=require('./routes/shop')
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes);
app.use(shoproutes);


app.use((req,res,next)=>{
    res.status(404).send('<h1>page not found</h1>')
})

app.listen(3000);