var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    let id=req.query.id;
    query(`select * from goods where id='${id}'`,function(err,data){
        res.json(data);
    })
});

module.exports = router;