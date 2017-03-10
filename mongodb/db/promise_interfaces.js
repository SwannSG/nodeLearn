const mongo_client = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const config = require('../db/config')

function insert({coll='', query='', proj='', docs='', options=''} = {}) {
    let outer_db;
    return new Promise(function(resolve, reject) {
        mongo_client.connect(config.uri.uri)
            .then(db => {outer_db = db; return db.collection(coll);})
            .then(collection => {
                if (Array.isArray(docs)) {
                    return collection.insertMany(docs);
                }
                else {
                    return collection.insert(docs);
                }
            })
            .then(result => {outer_db.close(); return result;})
            .then(result => resolve(result))
            .catch(err => reject(err));
    })
}



function find({coll='', query='', proj='', docs='', options=''} = {}) {
    let outer_db;
    return new Promise(function(resolve, reject) {
        mongo_client.connect(config.uri.uri)
            .then(db => {outer_db = db; return db.collection(coll);})
            .then(collection => {return collection.find(query).toArray();})
            .then(result => {outer_db.close; return result;})
            .then(result => resolve(result))
            .catch(err => reject(err));    
   })
}

function remove({coll='', query='', proj='', docs='', options=''} = {}) {
    let outer_db;
    return new Promise(function(resolve, reject) {
        mongo_client.connect(config.uri.uri)
            .then(db => {outer_db = db; return db.collection(coll);})
            .then(collection => {return collection.remove({})})
            .then(result => {outer_db.close(); return result;})
            .then(result => resolve(result))
            .catch(err => reject(err));
    })
}


module.exports = {
    insert: insert,
    remove: remove,
    find: find
}