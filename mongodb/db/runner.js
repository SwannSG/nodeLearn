const CommandResult = require('mongodb').CommandResult;

function runMongo(generator, argForGen) {
    let gen = generator(argForGen);
    let done, pullValue, pushValue, value;
    let values = []

/*
    function isFinalValue(value) {
        if (!value) {
            return false;
        }
        console.log(value)
        if (value.constructor.name === 'CommandResult' || 
            value.constructor.name === 'DBQuery' || 
            value.constructor.name === 'Array') {
            return true;
        }
        try {
            if (value.hasOwnProperty('result')) {
                return true;
            }
            return false;
        }
        catch(e) {return false;}
    }
*/
  
  
  
    return new Promise( (resolve, reject) => {
        function nextPull(pushValue) {
            pullValue = gen.next(pushValue);
            if (!pullValue.done) {
                // generator is not finished
                ( {value, done} = pullValue );
                if (value.constructor.name == 'Promise') {
                    // value is a promise
                    value
                        .then(promiseValue => {
                            values.push(promiseValue);    
                            nextPull(promiseValue);
                        })
                        .catch(err => reject(err));
                }
                else { 
                    // value is not a promise
                    values.push(value);
                    nextPull(value);
                }
            }
            else {
                // generator is finished
                resolve(values[values.length - 2]);
            }
      }
      nextPull(); // we have to start the process
   });
}

module.exports = {
    runMongo: runMongo
}