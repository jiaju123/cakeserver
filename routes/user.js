/**
 * Created by Administrator on 2018/5/22.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/', function(req, res) {
    query("select * from user",function (err, data) {
        if (err) {
            throw err;
            return;
        }
        res.json(data);
<<<<<<< HEAD
    });
=======
    })
>>>>>>> a2ad7e6caead6f1551cfc44eea3c851ac4cb01e1
});

router.post('/upd', function(req, res) {
    console.log(req.body);
    // let id=req.body.id;

    let pass=req.body.pass;
    console.log(pass)
    query(`update user set pass='${pass}' where zhanghao='admin'`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if(data.affectedRows===1){
            res.send("1")
        }else {
            res.send("0");
        }
    });
});

module.exports = router;