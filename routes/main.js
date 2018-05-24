/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/us',function(req,res,next){
    if(!req.session.login){
        res.send('no');
    }else{
        res.send(req.session.zhanghao);
    }
})


router.get('/exit',function (req,res) {
    if(req.session.login){
        res.send('edit');
    }
})

module.exports = router;