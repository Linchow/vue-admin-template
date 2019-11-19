var express = require('express');

var port = 8061; 
var userRouter = require('./routes/user');
var systemRouter = require('./routes/system');
const { verifyToken } = require('./token');

var app = express();

// 解决跨域的中间件
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header("X-Powered-By", ' 3.2.1')
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 验证token
app.use(function(req, res, next) {
  const whiteList = ['/user/login'];
  if(whiteList.indexOf(req.url) === -1 && !verifyToken(req.body.token)) {
    res.send({
      code: 1,
      msg: 'token失效，请重新登录'
    })
  }else {
    next()
  }
});

app.use('/user', userRouter);
app.use('/system', systemRouter);

// 404
app.use(function(req, res, next) {
  next(new Error('接口不存在，请检查后再调用！'))
});

// 错误处理中间件
app.use(function(err, req, res, next) {
  res.status(200).send({
    code: 500,
    data: false,
    msg: err.message || '系统错误，请稍后重试或联系管理员！'
  });
});

app.listen(port, function() {
  console.log(`Server is Running ...`);
})