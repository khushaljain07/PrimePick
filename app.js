//requiring the node module
const path=require('path');
const http =require('http');

//requiring the express module
const express=require('express');
const app=express();

//setting the templete engine
app.set('view engine','ejs');
app.set('views','views');

//requiring routes file from router folder
const adminRoutes=require('./routes/admin')
const shoproutes=require('./routes/shop')

// requiring rootpath template
const rootdir=require('./util/path')
 

 //requiring the body parser
const bodyParser=require('body-parser');

//adding folder public means its not accesible by use or making static
app.use(express.static(path.join(rootdir,'public')))

//parser used for getting req.body while clicking on submit button we get data
app.use(bodyParser.urlencoded({extended:false}));

//calling admin routes
app.use('/admin',adminRoutes.routes);


//calling shop routes
app.use(shoproutes);

//rendering 404.ejs page directle
app.use((req,res,next)=>{
    res.status(404).render('404',{docTitle:'error page',path:'/'})
})


app.listen(3000);