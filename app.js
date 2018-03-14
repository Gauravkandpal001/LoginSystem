const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const expressValidator=require('express-validator');
const flash=require('connect-flash');
const session=require('express-session');
const config=require('./config/database');
const passport=require('passport');

//connect to database
mongoose.connect(config.database);
let db= mongoose.connection;

//check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
});

//check for DB error
db.on('error',function(err){
    console.log(err);
});

//process.env is an object that stores environment variables as key value pairs
//we are looking for one that heroku is get set called
const port= process.env.PORT || 3000;
//Init app
const app=express();

//Bring in models
let Article =require('./models/article');

//Load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname,'public')));
//Express session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validator Middleware
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.')
        , root  =namespace.shift()
        , formParam=root;
        while(namespace.length){
            formParam +='['+namespace.shift()+']';
        }
        return {
            param: formParam,
            msg: msg,
            value:value
        };
    }
}));

//Passport config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//'*' means for all routes
app.get('*',(req,res,next)=>{
    res.locals.user=req.user || null;
    next();
});

//Home Route
app.get('/',function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
        } else{
          res.render('index',{
            title:'Articles',
            articles:articles
          });
         }
    });
});

//Route Files
let articles=require('./routes/articles');
let users =require('./routes/users');
app.use('/articles',articles);
app.use('/users',users);

//start server
app.listen(port,()=>{
    console.log('server started on port '+port);
});
