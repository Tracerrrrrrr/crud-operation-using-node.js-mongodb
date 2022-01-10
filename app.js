const express = require('express')
const app = express();
const path =require('path');
const pug = require('pug');
const mongoose=require('mongoose');
const port = 5000;
require('./middleware/middleware');
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use(require('./routes/auth'));
const DB = 'mongodb+srv://Shivam:Shivam7607786507@cluster0.oysfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';  
mongoose.connect(DB).then(()=>{
    console.log("Connected to database successfully");
}).catch((err)=>{
    console.log("Connection failed");
})
app.get('/', (req, res) => {
  res.render('base.pug');
})
app.get('/register',(req,res)=>{
  res.render('register.pug');
})
app.get('/login',(req,res)=>{
  res.render('login.pug');
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
