/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/car',function (req,res) {

    query("select * from car",function (err,body) {
        res.send(body);
    })
});
router.get('/cate',function (req,res) {
    let id = req.query.gid;
    query(`select * from goods where id='${id}'`,function (err,body) {
        if(err) throw err;
        if(sql.affectedRows==1){
            res.send('ok')
        }else{
            res.send('aaa')
        }
    })
});
router.get("/delcar", function(req, res) {
    let id = req.query.id;
    query(`delete from car where id='${id}'`), function (err, sql) {
        // if (err) throw err;
        res.send(sql);
    }
});

module.exports = router;