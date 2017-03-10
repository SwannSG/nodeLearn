const mongo_client = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const config = require('../db/config')

function *insert({coll='', query='', proj='', docs='', options=''} = {}) {
    let db = yield mongo_client.connect(config.uri.uri);
    let collection = yield db.collection(coll);        
    if (Array.isArray(docs)) {
        let result = yield collection.insertMany(docs);
    }
    else {
        let result = yield collection.insert(docs);
    }
    let disconnect = yield db.close();
}

function *remove({coll='', query='', proj='', docs='', options=''} = {}) {
    let db = yield mongo_client.connect(config.uri.uri);
    let collection = yield db.collection(coll);        
    let result = yield collection.remove({});
    let disconnect = yield db.close();    
}

function *findOne({coll='', query='', proj='', docs='', options=''} = {}) {
    let db = yield mongo_client.connect(config.uri.uri);
    let collection = yield db.collection(coll);        
    let result = yield collection.findOne(query);
    let disconnect = yield db.close();    
}

function *find({coll='', query='', proj='', docs='', options=''} = {}) {
    let db = yield mongo_client.connect(config.uri.uri);
    let collection = yield db.collection(coll);        
    let result = yield collection.find(query).toArray();
    let disconnect = yield db.close();    
}

module.exports = {
    insert: insert,
    remove: remove,
    findOne: findOne,
    find: find
}