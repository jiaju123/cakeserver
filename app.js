var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var svgCaptcha = require('svg-captcha');
var app = express();
var sql = require("./lib/pool");

var login = require('./routes/login');
var goods = require('./routes/goods');
var car = require('./routes/car');
var user = require('./routes/user');
var category = require('./routes/category');
var orders = require('./routes/orders');

app.use('/admin/login',login);
app.use('/admin/goods',goods);
app.use('/admin/car',car);
app.use('/admin/user',user);
app.use('/admin/category',category);
app.use('/admin/orders',orders);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

//session
app.use(session({
    secret:"syq",
    resave:true,
    saveUninitialized:true
}));
//上传文件
let morePhotos = multer.diskStorage({
    //指定文件上传位置
    destination:function (req,file,cb){
      cb(null,'upload');
    },
    //修改文件名字
    filename:function(req,file,cb){
      cb(null,file.fieldname + '-' + Date.now() + file.originalname);
    }
});
let upload = multer({storage:morePhotos});

app.get("/api/text",function(req,res){
   res.send('可以访问到服务器')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(3000,function(){
  console.log('服务器已启动');
});

