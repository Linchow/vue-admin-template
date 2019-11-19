var express = require('express');
var router = express.Router();

router.post('/user/list', function(req, res) {
  res.send({
    code: 1000,
    data: true,
    msg: ''
  })
})

module.exports = router;