var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    let id=req.query.id;
    query(`select * from goods where id='${id}'`,function(err,data){
        res.json(data);
    })
});
router.post('/xinxi',function(req,res){
    let data=req.body;
    let id=data.id;
    let text=data.text;
    let count=data.count;
    if(!req.session.login){
        res.send('no');
    }else{
        query(`insert into car (name,taste,price,count,gid) values ('','${text}','','${count}','${id}')`,function(err,data){
            if(data.affectedRows===1){
                res.send('ok');
            }
        });
    }
});

module.exports = router;