const path=require('path');
const http =require('http');

const express=require('express');
const app=express();
const adminData=require('./routes/admin')

const rootdir=require('./util/path')
 
const shoproutes=require('./routes/shop')

 
const bodyParser=require('body-parser');

app.use(express.static(path.join(rootdir,'public')))
app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminData.routes);
app.use(shoproutes);


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootdir,'views','404.html'))
})


app.listen(3000);