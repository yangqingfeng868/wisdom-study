const fs = require('fs');

/* 
1. 根据原始配置初始化 NeDB
*/
function initWisdomStudyDB(db, metaDefUrl, callback){

    // __dirname + '/' + confObj.metaDef
    const docArray　= parseMetaIntoJsonObj(metaDefUrl);
    docArray.forEach(function(docJson){
         db.insert(docJson, (err, ret) => {
              if(err) {
                console.log("Failed to insert doc: " + JSON.stringify(docJson) + " into Nedb");
                callback(err);
              }
              else {
                console.log("Insert doc: " + JSON.stringify(docJson) +" finished...");
                callback(null);
              }
         });
    });
}

// 2. 将原始配置解析成json 对象
function parseMetaIntoJsonObj(metaFileUrl){

    //const metaFileUrl = confObj.metaDef;
    //__dirname + '/def.meta'

    const myLines = fs.readFileSync(metaFileUrl).toString().match(/^.+$/gm);
    const docArray = new Array();

    myLines.forEach(function(line){

        const items = line.split('/');
        const doc = {};
        doc.word = items[0];
        doc.strut = items[1];
        doc.num = items[2];
        doc.type = items[3];
        doc.type = items[4];
        
        docArray.push(doc);
    });

    return docArray;
}

exports.initWisdomStudyDB = initWisdomStudyDB;
exports.parseMetaIntoJsonObj = parseMetaIntoJsonObj;






