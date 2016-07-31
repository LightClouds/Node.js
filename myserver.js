var myexpress = require("./server/node_modules/express");

//var userDAO = require("./server/dao/userdao.js");

var app = myexpress();

app.set("port",8888);
/*配置express*/
app.configure(function(){
      app.use(myexpress.logger("dev"));       //日志模块，写在核心模块上面，dev是开发者模式，日志会打印在console
    /*------------核心模块*/
    app.use(myexpress.bodyParser());
    app.use(myexpress.methodOverride());
    app.use(app.router);
    app.use(myexpress.static(__dirname+"/client"));
    /*------------核心模块完*/
    //浏览器上的图标
    //app.use(myexpress.favicon(__dirname+"/client/images/1.jpg"));
    app.use(myexpress.errorHandler());      //错误信息打印在控制台上s
});
app.listen(app.get("port"),function(){
    console.log("express正在监听端口:"+app.get("port"));
});

//app.get("/getPageNum.do",userDAO.getPageNum);
//app.get("/showResult.do",userDAO.showResult);
//app.get("/search.do",userDAO.search);
