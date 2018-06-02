/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.post('/',function (req,res) {
    let uid = req.body.id;
    query("select * from address where uid ="+ uid,function (err,body) {
        res.send(body);
    })
});

router.post('/address',function (req,res) {
    let city=req.body.city;
    let name=req.body.name;
    let address=req.body.address;
    let tel=req.body.tel;
    let zipcode=req.body.zipcode;
    let uid=req.body.uid;


    query(`insert into address (city,address,zipcode,name,tel,uid) values ('${city}','${address}','${zipcode}','${name}','${tel}','${uid}')`,function(err,data){
        if(data.affectedRows===1){
            let id=data.insertId;
            query("select * from address where id ="+ id,function (err,body) {
                res.send(body);
            })
        }
    });
});


module.exports = router;