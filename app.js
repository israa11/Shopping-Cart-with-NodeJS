const express = require('express');
const app =  express();
const passport = require('passport');
 
 const passportSteup = require('./config/passport.js')
  const session = require('express-session');
  const flash = require('connect-flash');
const db = require ('./config/database.js');
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
     secret: 'secret',
      resave: false,
       saveUninitialized: false 
    }));
 app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


app.set('view engine' , 'ejs')
app.use((req, res, next) => { 
  res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   
    next(); 
  });
const indexRouter = require('./routes/index.js');

app.use('/' , indexRouter)

const userRouter = require('./routes/user.js');
app.use('/users' , userRouter)
app.get('/' , (req , res) =>{
    res.redirect('/')
})


app.listen(3000, ()=>{
    console.log("app is working in 3000")
})