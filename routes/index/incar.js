/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/car',function (req,res) {
    let uid = req.query.id;
    query("select * from car where gid ="+ gid,function (err,body) {
        res.send(body);
        console.log(body);
    })
})

module.exports = router;