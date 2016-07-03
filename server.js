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
                //res.writeHead(200, {'Content-Type': 'application/json', 'charset':'utf-8'});
                res.json(docs);
                //res.writeHead(200, {'Content-Type': 'application/json', 'charset':'utf-8'});
            });

        });

        // 2. Search word
        app.get("/findWords", (req, res) => {
            console.log(req.query);

            var dbQuery = {};
　　　　　　　　　　　　if (req.query.word) {
                dbQuery.word = req.query.word;
            }
            if (req.query.num) {
                dbQuery.num = req.query.num;
            }
            if (req.query.strut) {
                dbQuery.strut = req.query.strut;
            }

            
            if(Object.keys(dbQuery).length > 0) {
                db.find(dbQuery, {muti: true}).sort({num: 1}).exec((err, docs) => {
                    console.log(docs);
                    res.json(docs);
                    //res.writeHead(200, {'Content-Type': 'application/json', 'charset':'utf-8'});
                    //res.end();
                });
            }　else {
　　　　　　　　　　　　　　　　res.end("{}");
            }
        });

        
        var server = app.listen(port, function(){
            var host = server.address().address;
            var port = server.address().port;

            console.log("server started at [host: " + host + ", port: " + port + "]");
        });
    }
}

module.exports = RestServer;
