const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer');
let upload = multer();


// global error handler
const events = require('events');
const errorEmitter = new events.EventEmitter();
// listener
errorEmitter.on('error', function(x) {  
    console.log("errorEmitter.on('error'.. listener has run")
    console.log(x);
})
// end global error handler


function showMethodsAndProperties(iterable_obj) {
    for (each in iterable_obj) {
        if (typeof(iterable_obj[each])=== 'function'){
            console.log(each, ': function');    
        }
        else if (typeof(iterable_obj[each])=== 'object'){
            console.log(each, ': object');
        }
        else {
            console.log(each, ': primitive :', iterable_obj[each]);
        }
    }
}

function common_mw_1(req,res,next) {
    console.log(new Date().toJSON(), 'common_mw_1', req.method, req.url);    
    next();
}

function common_mw_2(req,res,next) {
    console.log(new Date().toJSON(), 'common_mw_2', req.method, req.url);    
    next();
}

function mw_1(req,res,next) {
    console.log(new Date().toJSON(), 'mw_1', req.method, req.url);    
    next();
}

function mw_2(req,res,next) {
    console.log('mw_2', req.method, req.url);    
    next();
}

function mw_3(req,res,next){
    res.send('ROUTE: route_2 via middleware mw_3');
    res.end();
}

function mw_4(req,res,next) {
    let flag = false;
    if (flag) {
        res.send('mw_4 has decided to send a response');
        res.end();
    }
    else {
        next()
    }
}

app.use(common_mw_2);
app.use(common_mw_1);

app.listen(3000, 'localhost',function expressApp(){
    console.log('app is listening on localhost:3000');
});

// app.get('/route_1', mw_2, mw_1, (req, res) => {
//     res.send('ROUTE: route_1');
// })

app.get('/route_1', (req, res) => {
    console.log(req.headers);
    res.send('ROUTE: /route_1');
})

app.get('/route_1/:key1/:key2', (req, res) => {
    console.log('query:', req.query);
    console.log('params:', req.params);
    res.send('ROUTE: /route_1/:key1/:key2');
})

app.get('/route_1/:key1/:key2/:key3', (req, res) => {
    console.log('query:', req.query);
    console.log('params:', req.params);
    res.send('ROUTE: /route_1/:key1/:key2/:key3');
})



app.get('/route_2', mw_3)

app.get('/route_3', mw_4, (req, res)=> {
    res.send('ROUTE: /route_3, normal response');
})


// function intercept_bodyParser_json(req, res, next) {
//     bodyParser.json(req, res, next);
//     next()
// }


// app.post('/json-handler', intercept_bodyParser_json, (req,res) => {
//     console.log('hello there');
//     console.log(req.body);
//     console.log(res.statusCode);
//     res.sendStatus(200);
// })

function errorCatcher(error, req, res, next) {
    console.log('errorCatcher');
    if (error) {
        // error path
        // set response and send directly to client
        console.log('error path')
        res.statusCode = error.statusCode;
        // error.message 
        res.statusMessage = 'my customer error';
        res.send();
        // add some global error handling
        errorEmitter.emit('error', error)
        res.end();
    }
    // no error path
    else {
        console.log('no error path')
        next();
    }
}

function fn1(req, res, next) {
    console.log('fn1');
    next()
}

function fn2(req, res, next) {
    next();
}

app.post('/json-handler', bodyParser.json({limit:10000}), fn1, fn2,  errorCatcher,  (req,res) => {
    console.log('/json-handler');
    console.log(req.body);
    res.statusCode = 200; // is actually automatically set
    res.send(JSON.stringify({ a: 1, b:2 }));
});

app.get('/form', (req,res) => {
    console.log('GET /form');
    res.sendFile('/home/swannsg/development/nodeLearn/expressPlay/form.html');
});

//bodyParser.urlencoded()
// app.post('/form', bodyParser.urlencoded(), (req,res) => {
//     console.log('POST /form');
//     console.log(req.body)
// });

//multipart/form-data
app.post('/form', upload.fields(), (req,res) => {
    console.log('POST /form');
    console.log(req.body)
});



// app.post('/json-handler', bodyParser.json({limit:1}), (req,res) => {
//     console.log('hello there');
//     console.log(req.body);
//     console.log(res.statusCode);
//     res.sendStatus(200);
// })