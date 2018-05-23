/**
 * Created by Administrator on 2018/5/21.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");

router.get('/',function(req,res){
    query(' select * from goods',function(err,data){
        res.json(data);
    })
});
router.get('/delete',function(req,res){

    query(' delect from goods where=$id',function(err,data){
        res.json(data);
    })
})

// router.get('/del', function(req, res, next) {
//     let id=req.query.id;
//     query(`delete from comments where id=${id}`,function (err, data) {
//         if (err) {
//             throw err;
//             return;
//         }
//         if(data.affectedRows==1){
//             res.send("1")
//         }else {
//             res.send("0");
//         }
//
//
//     });
// });

module.exports = router;


