const mongoose = require("mongoose");
// set promises to ES6 standard promises
mongoose.Promise = Promise;
const Schema = mongoose.Schema;
const users = require('./mongoose/models/users');
const stuffs = require('./mongoose/models/stuffs');

let con=null;
let db_uri = 'mongodb://localhost:27017/db_mongoose'
let gb_err = null

mongoose.connect(db_uri)
    .then( ok => con = mongoose.connection)
    .catch( err => console.log('err', err))

stuff = new stuffs.StuffModel(
    {
        my_string: 't'
    }
)

/*stuff.save()
    .then(ok => console.log('saved ok'))
    .catch(err => {console.log('save error'); gb_err = err;})*/
    
stuff.save(function error(err){
    console.log('save error');
    gb_err = err;
})


/*users.UserModel.remove({})
    .then(result=> console.log('remove docs from UserModel'))
    .catch(err => console.log('err', err))


// create a document instance
let alex = new users.UserModel(
    {user:'Alex',password:'passwd',
    email:'Alex@tutorialtous.com'});

alex.save()
    .then(result => console.log('save'))
    .catch(err => console.log('save ERROR', err));

let jim = new users.UserModel (
    {user:'Jim',password:'passwd',
    email:'Jim@tutorialtous.com'});
jim.save()
    .then(result => console.log('save'))
    .catch(err => console.log('save ERROR', err));


users.UserModel.findById("58c6bd497faa994850db4cbd").exec()
    // result is document instance
    .then(result => {result.user = ''; result.save();})
    .catch( err => console.log('err', err))

// update with NO validation
users.UserModel.update( {_id: "58c6bd497faa994850db4cbd"}, {$set: { user: '' }}).exec()
    .then(result => console.log(result))
    .catch(err => console.log('ERROR', err))

// update with validation
users.UserModel.update( {_id: "58c6bd497faa994850db4cbd"},
                        { $set: { user: 'Eric' }},
                        {runValidators: true, context: 'query'}).exec()
    .then(result => console.log('aaa', result))
    .catch(err => console.log('ERROR', err))


users.UserModel.findByIdAndUpdate({_id: "58c6bd497faa994850db4cbd"},
                                  { $set: { user: '' }}).exec()
    .then(result => console.log('bbb', result))
    .catch(err => console.log('ERROR', err))

users.UserModel.findByIdAndUpdate({_id: "58c6bd497faa994850db4cbd"},
                                  { $set: { user: 'Herbert' }},
                                  {runValidators: true, context: 'query'}).exec()
    .then(result => console.log('ccc', result))
    .catch(err => console.log('ERROR', err))




users.UserModel.find({user: 'Herbert'}).exec()
    .then(result => {
        console.log('find_result', result);
        for (each of result) {
            each.user = 'Herbert'
            console.log(Object.getPrototypeOf(each));
            each.save();
        }
    })
    .catch( err => console.log('err', err))


let query = users.UserModel.find({user: 'Herbert'})
query
    .limit(10)
    .sort({ user: -1 })
    .select({ email: 1, user: 1, _id:1 })
    .exec()
    .then(result => { result[0].user='Jamaes'; result[0].save(); })
    .catch(err => console.log('ERROR', err))


let query = users.UserModel.find({})
let cursor = query.cursor()         // cursor object

cursor.eachAsync(doc => console.log(doc))
    .then(() => console.log('done'))
    .catch(err => console.log('ERROR', err))

cursor.on('data', function eachDoc(doc) {
    console.log(doc);
})


cursor.on('close')
    // all docs read
    .then(() => console.log('all docs read'))
    .catch(err => console.log('ERROR', err))
*/

