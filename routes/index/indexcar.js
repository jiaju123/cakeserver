/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    if(!res.session.login){
        res.send('no')
    }else{
        query(' select * from orders',function(err,data){
            res.json(data);
        })
    }


});



module.exports = router;