/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/',function(req,res){
    query("select * from orders,user where orders.uid=user.id",function(err,data){
        if (err) throw err;
        res.json(data);
    })
});



module.exports = router;