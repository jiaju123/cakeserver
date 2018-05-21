/**
 * Created by Administrator on 2018/5/21.
 */
let mysql = require("mysql");
const option = {
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"car"
};
let pool = mysql.createPool(option);

function query(sql,callback){
    pool.getConnection(function(err,link){
        if (err){
            callback(err);
        }else{
            link.query(sql,function(err,res){
                if (err){
                    callback(err);
                }else{
                    callback(null,res);
                    link.release();
                }
            });
        }
    })
}