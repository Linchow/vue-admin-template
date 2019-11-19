const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/vue-admin-template';

// 删除操作
var deletes = function (db, collections, selector, fn, next) {
  db.collection(collections).deleteOne(selector, function (err, data) {
    if (err) next(err);
    console.log(`${collections} 删除成功`);
    fn(data);
  })
}

// 查询
var find = function (db, collections, selector, fn, next) {
  db.collection(collections).find(selector).toArray(function (err, data) {
    if (err) next(err);
    console.log(`${collections} 查询成功`);
    fn(data);
  })
}

// 修改
var update = function (db, collections, selector, fn, next) {
  db.collection(collections).update(selector[0], selector[1], function (err, result) {
    if (err) next(err);
    console.log(`${collections} 修改成功`);
    fn(result);
  })
}

//  添加
var add = function (db, collections, selector, fn, next) {
  db.collection(collections).insert(selector, function (err, result) {
    if (err) next(err);
    console.log(`${collections} 添加成功`);
    fn(result);
  })
}
var methodType = {
  delete: deletes,
  find: find,
  update: update,
  add: add
}

module.exports = function (type, collections, selector, next, fn) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) next(err);
    var dbo = db.db('vue-admin-template');
    methodType[type](dbo, collections, selector, fn, next)
    db.close();
  });
}
