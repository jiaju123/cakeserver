/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/',function(req,res){
    res.send('main');
})



module.exports = router;