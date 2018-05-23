/**
 * Created by Administrator on 2018/5/21.
 */
var express = require('express');
var router = express.Router();
var query = require("../lib/pool");

router.post('/check',function (req,res) {
    console.log(req.body);
    let zhanghao=req.body.zhanghao;
    console.log(zhanghao);
    let pass=req.body.pass;
    // let code=req.body.code
    // if(code.toUpperCase()!==req.session.code.toUpperCase()){
    //     res.send('验证码错误')
    //     return
    // }
    query(`select * from user where zhanghao='${zhanghao}'`,function (err,result) {
        if(err){
            throw err
        }
        if(result.length!==0){
            if(pass===result[0].pass){
                req.session.login='yes';
                req.session.zhanghao=zhanghao;
                res.send('ok')
                // res.redirect('/users/')
            }else{
                res.send('密码错误')
            }
        }else{
            res.send('账号不存在')
        }
    })
});

module.exports = router;