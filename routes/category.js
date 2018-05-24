/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/',function(req,res){
    query("select * from category",function(err,data){
        if (err) throw err;
        res.json(data);
    })
});

router.post('/add',function(req,res){
    let name = req.body.name;
    let ename = req.body.ename;
    query(`insert into category(name,ename) value('${name}','${ename}')`,function(err,data){
       if(data.affectedRows===1){
           res.send('ok');
       }else{
           throw err;
       }
    })
});

router.get('/edit',function(req,res){
    let id=req.query.id;
    query(`select * from category where id=${id}`,function(err,data){
        res.json(data);
    })
});

router.get('/editcheck',function(req,res){
    let id=req.query.id;
    query(`update category set  where id=${id}`,function(err,data){
        res.json(data);
    })
});
module.exports = router;