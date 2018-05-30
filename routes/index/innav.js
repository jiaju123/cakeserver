/**
 * Created by Administrator on 2018/5/24.
 */
var express = require('express');
var router = new express();
var query = require("../../lib/pool");

router.get('/',function(req,res){
    query("select * from category",function(err,data){
        if (err) throw err;
        res.json(data);
    })
});

router.post('/regist',function(req,res){
    let zhanghao=req.body.zhanghao;
    let pass=req.body.pass;


    query(`select * from user where zhanghao='${zhanghao}'`,function (err,result) {
        if(err){
            throw err
        }
        if(result.length == 0){
            query(`insert into user(zhanghao,pass) value('${zhanghao}','${pass}')`,function(err,data){
                if(data.affectedRows===1){
                    res.send('ok');
                }else{
                    throw err;
                }
            })
        }else{
            res.send('账号存在')
        }
    })



});

router.post('/login',function (req,res) {
    let zhanghao=req.body.zhanghao;
    let pass=req.body.pass;

    query(`select * from user where zhanghao='${zhanghao}'`,function (err,result) {
        if(err){
            throw err
        }
        if(result.length!==0){
            if(pass===result[0].pass){
                req.session.login='yes';
                req.session.zhanghao=zhanghao;
                res.send('ok')
            }else{
                res.send('密码错误')
            }
        }else{
            res.send('账号不存在')
        }
    })

});


module.exports = router;