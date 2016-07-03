const fs = require('fs');
const nedb = require('nedb');
const waterfall = require('async-waterfall');
const dbinit = require('./dbinit');


   // 1. 清除DB 历史数据，重新开始
   function resetDB(testDb){
       fs.exists(testDb, (ret) =>{
           if(ret) {
               console.log('resetDB.. ' + ret);
               fs.unlink(testDb, (err) => {
                   if(err) 
                       console.log('Failed to unlink DB file:' + testDb)
                   else
                       console.log(testDb + ' deleted');
                   });
	   }
       });
   }

   // 2. 初始化DB
   function loadDataIntoDB(testDb, confObj){
       const db = new nedb({
          filename: testDb,
          autoload: true
       });
       
       dbinit.initWisdomStudyDB(db, confObj.metaDef, (err) => {
           if(err)
               console.log('Error occur during initializing db: ' + err);
       });

       return db;
   }

   // 3. 测试数据库是否正确初始化
   function fetchDataForTest(confObj, db){
       const docArray = dbinit.parseMetaIntoJsonObj(confObj.metaDef);

       docArray.forEach(function(docJson){
       db.find({word: docJson.word}, {muti: true}, (err, docs)=>{
               console.log("Find word=: " + docJson.word + " , result=" + JSON.stringify(docs));
           });
       });
   }

// only for testing....
function testInitDB() {
   // /home/robert/project/web-nodejs/wisdom-study/test/wisdom.db
   const testDb = __dirname + '/test/wisdom.db';
   // /home/robert/project/web-nodejs/wisdom-study/test/def.meta
   const confObj = {metaDef: __dirname + '/test/def.meta'};

   waterfall([
      function(callback){
          //console.log('Cleaning up db...');
          resetDB(testDb);
          callback(null, testDb, confObj);
      },
      function(testDb, confObj, callback){
          //console.log("Loading data into db...");
          const db = loadDataIntoDB(testDb, confObj);
          callback(null, confObj, db);
      },
      function(confObj, db){
          //console.log("Fetching data from db for testing...");
          fetchDataForTest(confObj, db);
      }
   ],function(err, ret){
          console.log("err: " + err + " ,ret: " + ret);
   });
}

testInitDB();
