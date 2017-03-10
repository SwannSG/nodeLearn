const events = require('events');
const errorEmitter = new events.EventEmitter();

errorEmitter.on('error', function(x) {
    console.log(x);
})

module.exports = {
    errorEmitter: errorEmitter
}