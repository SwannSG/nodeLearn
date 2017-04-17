// We create the schema and model for users here
const mongoose = require('mongoose');
mongoose.Promise = Promise;



let stuffsSchema = new mongoose.Schema(
    {
        my_string: {type:String,
                    minlength: [2, 'my_string must be at least 2 characters.'],
                    maxlength: [20, 'Username must be less than 20 characters.']}, 
        email:     {type:String,
                    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            'invalid email']},
        colour:    {type: String,
                    enum: ['red', 'green', 'blue']},
        name:       {type: String, trim: true},
        option:     {type: String,
                    validate: [(value) => {if (value=='test') {return true;} return false;},
                     'option error is not correct']},
        car:       {type: String, required: [true, 'car is absolutely required']},
        count:     {type: Number, min:5, max:10},
        date:      {type: Date, min: new Date('2017-01-01'), max: new Date('2017-01-30')} 
     },
    {collection: 'stuffs'}
);

//var s = new Schema({ d: { type: Date, max: Date('2014-01-01') })

let StuffModel = mongoose.model('Stuff', stuffsSchema);

module.exports = {
    stuffsSchema: stuffsSchema,
    StuffModel: StuffModel 
}