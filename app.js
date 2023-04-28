const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
 


const mongoConnect = require('./util/database').mongoConnect;
const User=require('./model/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('644a61a4de1f25bf53dbe083')
    .then(user => {
      req.user = new User (user.name,user.email,user.cart,user._id);
      next();
    })
    .catch(err => console.log(err));
 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);



mongoConnect(()=> {
  
  app.listen(3000);
});
 