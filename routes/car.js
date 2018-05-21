/**
 * Created by Administrator on 2018/5/21.
 */
var express = require('express');
var router = new express();

router.get('/',function(req,res){
    res.send('car');
})



module.exports = router;