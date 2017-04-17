const mongoose = require("mongoose");
// set promises to ES6 standard promises
mongoose.Promise = Promise;
const Schema = mongoose.Schema;
const users = require('./mongoose/models/users');
const stuffs = require('./mongoose/models/stuffs');

let db_uri = 'mongodb://localhost:27017/db_mongoose'
let gb_err = null

mongoose.connect(db_uri, {}, function(err){
    if (err) {
        console.log('conn error')
        console.log(err.message);
        gb_err = err;
    }
    else {
        console.log('connected to db');
    }
})




stuff = new stuffs.StuffModel(
    {
        my_string: 'tango',
        email: 'abc@google.com',
        colour: 'pink',
        name: '  James   ',
        option: 'error.test',
        count: '1',
        date: new Date('2017-02-25')
    }
)

/*let vs = stuff.validateSync();
console.log(vs);*/
    
stuff.save(function error(err){
    if (err) {
        console.log('save error');
        console.log(err);
    }
})


stuffs.StuffModel.findByIdAndUpdate("58cc11afed3a504383e6e17e",
   {my_string: 'tango',
    email: 'abc@google.com',
    colour: 'pink',
    name: '  James   ',
    option: 'error.test',
    count: '1',
    date: new Date('2017-02-25')},
    {runValidators: true, context: 'query'}
 ).exec()
 .then(() => console.log('update good'))
 .catch(err => console.log(err))