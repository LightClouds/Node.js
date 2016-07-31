/**
 * Created by jonhn on 2016/7/31.
 */
/**
 * Created by Administrator on 2016/1/26.
 */
var mysql = require("./../node_modules/mysql");

/*数据库配置信息*/


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    //host:'192.168.4.227',
    user: 'root',
    password: 'root',
    database: '',
    port: '3306'
});
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'baijie84'
});
/**
 * 封装的sql操作方法
 * @param sql   传入的sql语句
 * @param res   响应的内容
 */
function poolGetConnection(sql, res) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        /*执行sql语句*/
        connection.query(sql, function (err, result) {
            console.log("result" + result);
            /*返回数据*/
            res.send(result);
            /*链接释放*/
            connection.release();
        })
    });
}
exports.getimgs = function (req, res) {
    console.log("req===" + req);
    var imageclass = req.query.imageClass;
    console.log("imageclass===" + imageclass);
    //var sql = "SELECT imageSrc,imageTitle,imageIntroduction FROM imagetable WHERE imageClass LIKE '%"+imageclass+"%'";
    var sql = "SELECT * FROM imagetable WHERE imageClass LIKE '%" + imageclass + "%'";
    /*从连接池里去链接*/
    poolGetConnection(sql, res);
};