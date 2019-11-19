var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;

const MongoConnet = require('../dbhandler');
const { createToken } = require('../token');

router.post('/login', function(req, res, next) {
  var {loginName, pwd} = req.body;
  var query = {loginName: loginName};
  MongoConnet('find', 'user', query, next, function(data) {
    if(data.length === 0) {
      res.send({
        code: 500,
        msg: '该用户不存在'
      })
    }else if(data[0].pwd !== pwd){
      res.send({
        code: 500,
        msg: '账号或密码输入错误'
      })
    }else {
      var token = createToken(loginName)
      var selector = [
        query,
        {
          $set: {
            token: token
          }
        }
      ]
      MongoConnet('update', 'user', selector, next, function(result) {
        let backData = data[0];
        backData.token = token
        res.send({
          code: 1000,
          data: backData,
          msg: ''
        })
      })
    }
  })
})

module.exports = router;