/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    query(' select * from goods',function(err,data){
        res.json(data);
    })
});

router.post('/addcar',function(req,res){
    let id=req.body.id;
    if(!req.session.login){
        res.send('no');
    }else{
        query(`insert into car (name,taste,price,count,gid) values ('','','','','${id}')`,function(err,data){
            if(data.affectedRows===1){
                res.send('ok');
            }
        });
    }
});

module.exports = router;