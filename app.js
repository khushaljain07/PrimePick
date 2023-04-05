const path=require('path');
const http =require('http');

const express=require('express');
const app=express();
const errorController=require('./controller/error')
app.set('view engine','ejs');
app.set('views','views');
const adminRoutes=require('./routes/admin')

const rootdir=require('./util/path')
 
const shoproutes=require('./routes/shop')

 
const bodyParser=require('body-parser');

app.use(express.static(path.join(rootdir,'public')))
app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes.routes);
app.use(shoproutes);


app.use(errorController.erorr404)


app.listen(3000);