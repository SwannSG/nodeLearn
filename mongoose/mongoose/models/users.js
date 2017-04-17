// We create the schema and model for users here
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let usersSchema = new mongoose.Schema(
    {user: {type:String, index:true, unique:true, trim:true, required:true},
    password: {type:String, default:'1234567'},
    email: {type:String, required:true, match: /.+\@.+\..+/, index:true}},
    {collection:'users'}
);

let UserModel = mongoose.model('User', usersSchema) 

module.exports = {UserModel: UserModel, usersSchema: usersSchema}
