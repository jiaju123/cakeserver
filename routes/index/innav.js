/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    query("select * from category",function(err,data){
        if (err) throw err;
        res.json(data);
    })
});

router.post('/regist',function(req,res){
    let zhanghao=req.body.zhanghao;
    let pass=req.body.pass;

    query("select * from user where zhanghao="+zhanghao,function(err,data){
        if (err) throw err;
       if(data){
           res.send('123')
       }else{
           query(`insert into user(zhanghao,pass) value('${zhanghao}','${pass}')`,function(err,data){
               if(data.affectedRows===1){
                   res.send('ok');
               }else{
                   throw err;
               }
           })
       }
    })

});

module.exports = router;