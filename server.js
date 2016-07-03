const express = require("express");
const fs = require("fs");


function RestServer(nedb, serverOptions) {
    const db = nedb;
    const port = serverOptions.port;
    
    const app = express();

    this.start = function() {

        // 1. list all the words
        app.get("/listWords", (req, res) => {
            console.log("db is: " + db);

            db.find({}).sort({word:1}).limit(3).exec((err, docs) => {
                console.log(docs);
                // 2. for production
                res.writeHead(200, {'Content-Type': 'application/json', 'charset':'utf-8'});
                res.end(JSON.stringify(docs));
                
                // for testing in browser
                //res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
                //res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
                res.end(JSON.stringify(docs));
            });

        });

        
        var server = app.listen(port, function(){
            var host = server.address().address;
            var port = server.address().port;

            console.log("server started at [host: " + host + ", port: " + port + "]");
        });
    }
}

module.exports = RestServer;
