const fs = require('fs');
const events = require('events');
const nedb = require('nedb');
const conf = require('./conf.json');
const dbinit = require('./dbinit');
const RestServer = require("./server");

// 2. init DB
function initDB(dbOptions, loadFromRaw){
   console.log("initializing nedb....[nedbUrl: " + dbOptions.dburl + " , loadFromRaw: " + loadFromRaw + ", metaDef: " + dbOptions.metaDef +"]");

   const db = new nedb({
      filename: dbOptions.dburl, 
      autoload: true
   });

   if (loadFromRaw) {
       dbinit.initWisdomStudyDB(db, dbOptions.metaDef);
   }

   return nedb;
}

// 3. start Server
function startServer(db){
   console.log("starting server....");
   const restServer = new RestServer(db, {port: 8081});
   restServer.start();
}


// load options configurations
function mainFlow(dbOptions){

    const event = new events.EventEmitter();

    // 1. check the wisdom-study db
    event.on("check_status_event", function(){

       fs.exists(dbOptions.dburl, (exists) => {
           console.log("DB exists " + exists);
           if (exists) {
               event.emit("init_db_event", dbOptions, false);
           } else {
               event.emit("init_db_event", dbOptions, true);
           }
           return exists;
       });

    });

    // 2. init db
    event.on("init_db_event", function(dbOptions, loadFromRaw){

        console.log(" 3. begin to init db... ");
        const db = new nedb({
          filename: dbOptions.dburl, 
          autoload: true
        });

        if (loadFromRaw) {
           dbinit.initWisdomStudyDB(db, dbOptions.metaDef, (err) => {
               if(err) 
                   event.emit("Failed_to_setup", "error occur during nedb initializing...");
               else
                   event.emit("start_server", db);
               
           });
        } else {
            event.emit("start_server", db);
        }
    });

    // 3. start server
    event.on("start_server", function(nedb){
        startServer(nedb);
    });

    event.on("stop_server", function(nedb) {
       // todo
       console.log("Do nothing...");
    });

    event.on("Failed_to_setup", function(err){
        console.log("Failed to set up : " + err);
    });

    event.emit('check_status_event');
}


//const dburl = __dirname + "/" + conf.options.dbUrl;
const dboptions = {
    dburl: __dirname + "/" + conf.options.dbUrl,
    metaDef: __dirname + "/" + conf.options.metaDef
}
console.log(JSON.stringify(dboptions));
mainFlow(dboptions);


