/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    query("select * from goods",function(err,data){
        res.json(data);
    })
});
router.post('/addcar',function(req,res){
    let id=req.body.gid;
    // let taste = req.body.taste;
    let count = req.body.count;
    query(`insert into car (count,gid) values ('${count}','${id}')`,function(err,data){
        if(err) throw err;
        if(data.affectedRows==1){
            res.send('ok')
        }else{
            res.send('aaa')
        }
    });
});
module.exports = router;