const runner = require('./db/runner');
const gen = require('./db/gen_interfaces');
const prom = require('./db/promise_interfaces');
const error = require('./errors/error_handling');

prom.insert({coll:'Persons', docs:{firstname: 'Ape', lastname: 'Brain'}})
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err))


prom.find({coll:'Persons', query:{firstname: 'Ape', lastname: 'Brain'}} )
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err)) 

/*prom.remove({coll:'Persons'})
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err))
*/


/*
// using generators and promises
runner.runMongo(gen.insert, {coll:'Persons', docs:{firstname: 'Ape', lastname: 'Brain'}})
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err)) 


runner.runMongo(gen.findOne, {coll:'Persons', query:{firstname: 'Ape', lastname: 'Brain'}} )
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err)) 

runner.runMongo(gen.find, {coll:'Persons', query:{firstname: 'Ape', lastname: 'Brain'}} )
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err)) 


runner.runMongo(gen.remove, {coll:'Persons'})
    .then(result => console.log(result))
    .catch(err => error.errorEmitter.emit('error', err)) 
// end using generators and promises
*/

