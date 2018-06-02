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
    let data=req.body;
    let id=data.gid;
    query(`insert into car (name,taste,price,count,gid) values ('','','','','${id}')`,function(err,data){
        if(!req.session.login) {
            res.send('no')
        };
        if (data.affectedRows===1){
            res.send('ok');
        }
    });
});
// router.post("/addcar", function (req, res) {
//     let name = req.body.name;
//     let taste = req.body.taste;
//     let price = req.body.price;
//     let count = req.body.count;
//     let img = req.body.img;
//     let gid = req.body.gid;
//     query(`insert into car (count,img,uid,price) values ('${name}','${count}'','${img}','${uid}','${price}')`,function (err,sql) {
//         if(err) throw err;
//         if(sql.affectedRows==1){
//             res.send('ok')
//         }else{
//             res.send('aaa')
//             console.log(aaa);
//         }
//     } )
//
// })
// router.get('/hot', function (req, res) {
//     let nub=req.query.nub
//     let size=req.query.size
//     let n=(nub-1)*size
//     query('select * from goods', function (err, sql) {
//         if (err) throw err;
//         let ridarr = [];
//         sql.forEach(val => {
//             let rid = JSON.parse(val.rid);
//             let flag = rid.includes(3);
//             if (flag) {
//                 ridarr.push(JSON.stringify(val))
//             }
//         });
//         let arr=ridarr.slice(n,nub*size)
//         // console.log(ridarr.length);
//         res.send(arr)
//     })
//
//
// });
// router.post("/addbuycar", function (req, res) {
//     let name = req.body.name;
//     let count = req.body.count;
//     let img = req.body.img;
//     let gid = req.body.gid;
//     let price = req.body.price;
//     query(`insert into car (count,pid,img,gid,price) values ('${name}','${count}','${pid}','${img}','${uid}','${price}')`,function (err,sql) {
//         if(err) throw err;
//         if(sql.affectedRows==1){
//             res.send('ok')
//         }else{
//             res.send('aaa')
//         }
//     } )
//
// })


module.exports = router;