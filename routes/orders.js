/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();

router.get('/',function(req,res){
    res.send('orders');
})



module.exports = router;