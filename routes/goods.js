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
    let body = req.body
    let img = JSON.parse(body.fileList)
    let str = []
    console.log(img);
    img.forEach(val => {
        if (val.response) {
            let newpath = "/" + Date.now() + val.name
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./public/img'+newpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            str.push({name: val.name, url: newpath})
        } else {
            str.push({name: val.name, url: val.url})
        }
    })
    console.log(req.body);
    res.send(str)
});




router.post('/upload', upload.single('file'), function (req, res, next) {
    res.send(req.file.path)
});

router.post('/form', function (req, res) {
    let body = req.body
    let img = JSON.parse(body.fileList)
    let str = []
    img.forEach(val => {
        if (val.response) {
            let newpath = "/" + Date.now() + val.name
            // fs.renameSync(val.response, './public' + newpath)
            let input = fs.createReadStream(val.response);
            let output = fs.createWriteStream('./public/img'+newpath);
            input.pipe(output,function () {
                fs.unlinkSync(val.response);
            });
            str.push({name: val.name, url: newpath})
        } else {
            str.push({name: val.name, url: val.url})
        }
    })
    console.log(str);
    res.send(str)

});



// app.post('/upload',upload.single('file'),function (req,res,next) {
//     res.send(req.file.path);
//
// });
// app.post('/from',function (req,res) {
//     let body=req.body;
//     let img=JSON.parse(body.fileList);
//     let str=[];
//     img.forEach(val=>{
//         if(val.response){
//             let newpath="/"+Date.now()+val.name;
//             fs.renameSync(val.response,'./public'+newpath);
//             str.push({name:val.name,url:newpath})
//         }else {
//             str.push({name:val.name,url:url})
//         }
//     });
//     console.log(str);
// });

module.exports = router;


