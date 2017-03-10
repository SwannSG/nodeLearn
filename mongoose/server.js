var mongoose = require ("mongoose");

mongoose.Promise = Promise;

uri = {
    prefix: 'mongodb',
    ip_address: 'localhost',
    port: 27017,
    database: 'db1',
    uri_string: function() {return this.prefix + '://' + this.ip_address + ':' + this.port +'/' + this.database}
};

mongoose.connect(uri.uri_string())
    .then( ok => console.log('connected ok', ok))
    .catch( err => console.log('err', err))


var Schema = mongoose.Schema;

var usersSchema= new Schema({
	userid:{type:String,index:true,unique:true,trim:true,required:true},
	password:{type:String,default:"1234567"},
	balancechips:{type:Number,default:0.0},
	state:{type:Number,default:2},
	emailid:{type:String,required:true,match: /.+\@.+\..+/,index:true}
},{collection:'users'});
 
usersSchema.statics.getId=function(_userid,cb){
	 console.log("userid"+_userid);
	 return UserModel.find({ userid: new RegExp(_userid, 'i') },{userid:1,_id:1}, cb);
};

usersSchema.methods.getUserId=function(_userid,cb){
	console.log("userid"+_userid);
	 return UserModel.find({ userid: new RegExp(_userid, 'i') },{userid:1,_id:1}, cb);
};
UserModel = mongoose.model('Users',usersSchema);

module.exports={UserModel}; 
