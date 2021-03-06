var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var svgCaptcha = require('svg-captcha');
var app = express();

var login = require('./routes/login');
var goods = require('./routes/goods');
var car = require('./routes/car');
var suser = require('./routes/suser');
var user = require('./routes/user');
var category = require('./routes/category');
var orders = require('./routes/orders');
var address = require('./routes/address');
var main = require('./routes/main');

var inlogin = require('./routes/index/inlogin');
var inzhuce = require('./routes/index/inzhuce');
var innav = require('./routes/index/innav');
var index = require('./routes/index/index');
var incate = require('./routes/index/incate');
var inabout = require('./routes/index/inabout');
var incar = require('./routes/index/incar');
var indexcar = require('./routes/index/indexcar');
var xiangqing = require('./routes/index/xiangqing');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',express.static(path.join(__dirname, 'public')));

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

app.use('/api/admin/login',login);
app.use('/api/admin/goods',goods);
app.use('/api/admin/car',car);
app.use('/api/admin/main',main);
app.use('/api/admin/user',user);
app.use('/api/admin/suser',suser);
app.use('/api/admin/category',category);
app.use('/api/admin/orders',orders);
app.use('/api/admin/address',address);

app.use('/api/index/inlogin',inlogin);
app.use('/api/index/inzhuce',inzhuce);
app.use('/api/index/innav',innav);
app.use('/api/index/index',index);
app.use('/api/index/incate',incate);
app.use('/api/index/inabout',inabout);
app.use('/api/index/incar',incar);
app.use('/api/index/indexcar',indexcar);
app.use('/api/index/xiangqing',xiangqing);
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

