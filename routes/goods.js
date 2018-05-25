/**
 * Created by Administrator on 2018/5/21.
 */
var express = require('express');
var router = new express();
var query = require("../lib/pool");
var multer=require("multer");
var fs = require('fs');
var os = require('os');

let upload = multer({

    dest: os.tmpdir()
})

router.get('/',function(req,res){
    query(' select * from goods',function(err,data){
        res.json(data);
    })
});
router.get('/del', function(req, res, next) {
    let id=req.query.id;
    query(`delete from goods where id=${id}`,function (err, data) {
        if (err) {
            throw err;
            return;
        }
        if(data.affectedRows==1){
            res.send("1")
        }else {
            res.send("0");
        }
    });
});


router.post('/add',function(req,res){
    let body = req.body;
    let name = req.body.name;
    let pricen = req.body.pricen;
    let priceo = req.body.priceo;
    let cid = req.body.cid;
    let taste1=req.body.taste1;
    let taste2=req.body.taste2;
    let taste3=req.body.taste3;
    let taste4=req.body.taste4;

    let title1=req.body.title1;
    let title2=req.body.title2;
    let title3=req.body.title3;
    let title4=req.body.title4;

    let str1=aa(body.desc1);
    let str2=aa(body.desc2);
    let str3=aa(body.desc3);
    let str4=aa(body.desc4);
    let xiangqing=aa(body.xiangqing);
    query(`insert into goods(name,desc1,desc2,desc3,desc4,pricen,priceo,taste1,taste2,taste3,taste4,cid,xiangqing,title1,title2,title3,title4) value('${name}','${str1}','${str2}','${str3}','${str4}','${pricen}','${priceo}','${taste1}','${taste2}','${taste3}','${taste4}','${cid}','${xiangqing}','${title1}','${title2}','${title3}','${title4}')`,function(err,data){
        if(data.affectedRows===1){
            res.send('ok');
        }else{
            throw err;
        }
    })
});
router.post('/upload', upload.single('file'), function (req, res, next) {
    res.send(req.file.path)
});
function aa(pic) {
    let img = JSON.parse(pic);
    let str = [];
    img.forEach(val => {
        if (val.response) {
            let newpath = "/" + Date.now() + val.name;
            // fs.renameSync(val.response, './public' + newpath)
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./public/img'+newpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            str.push({name: val.name, url: '/api/img'+newpath})
        } else {
            str.push({name: val.name, url: val.url})
        }
    });
    return JSON.stringify(str)
}

//编辑
router.get('/edit',function(req,res){
    let id=req.query.id;
    query(`select * from goods where id=${id}`,function(err,data){
        res.json(data);
    })
});
function bb(pic) {
    let img = JSON.parse(pic);
    let str = [];
    img.forEach(val => {
        if (val.response) {
            let newpath = "/" + Date.now() + val.name;
            // fs.renameSync(val.response, './public' + newpath)
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./public/img'+newpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            str.push({name: val.name, url: '/api/img'+newpath})
        } else {
            str.push({name: val.name, url: val.url})
        }
    });
    return JSON.stringify(str)
}

router.post('/up' ,function(req, res) {
    let id = req.body.id;
    let body = req.body;
    let name = req.body.name;
    let pricen =req.body.pricen;
    let priceo =req.body.priceo;
    let cid = req.body.cid;
    let taste1=req.body.taste1;
    let taste2=req.body.taste2;
    let taste3=req.body.taste3;
    let taste4=req.body.taste4;

    let title1=req.body.title1;
    let title2=req.body.title2;
    let title3=req.body.title3;
    let title4=req.body.title4;


    let desc1=bb(body.desc1);
    let desc2=bb(body.desc2);
    let desc3=bb(body.desc3);
    let desc4=bb(body.desc4);
    console.log(body);
    let xiangqing=bb(body.xiangqing);
    console.log()
    query(`update goods set name='${name}',desc1='${desc1}',desc2='${desc2}',desc3='${desc3}',desc4='${desc4}',pricen='${pricen}',priceo='${priceo}',taste1='${taste1}',taste2='${taste2}',taste3='${taste3}',taste4='${taste4}',cid='${cid}',xiangqing='${xiangqing}',title1='${title1}',title2='${title2}',title3='${title3}',title4='${title4}' where id='${id}'`,function (err, result) {
        if (result.affectedRows===1){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});
module.exports = router;


