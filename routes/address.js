/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/',function(req,res){
    query("select address.id,address.address,address.city,address.zipcode,address.name,address.tel,address.uid,user.nickname from address,user where address.uid=user.id",function(err,data){
        if (err) throw err;
        res.json(data);
    })
})



module.exports = router;