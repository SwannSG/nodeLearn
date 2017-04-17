const express = require('express');
const app = express();
const bodyParser = require('body-parser');


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
        res.statusMessage = error.message + ' some user crap';
        res.send();
        // add some global error handling
        res.end();
    }
    // no error path
    else {
        console.log('no error path')
        next();
    }
}

function someJunk(error, req, res, next) {
    console.log('someJunk');
    next(error);
}

//{limit:1}
app.post('/json-handler', bodyParser.json(), someJunk, errorCatcher,  (req,res) => {
    console.log('hello there');
    console.log(req.body);
    console.log(res.statusCode);

res.send(JSON.stringify({ a: 1 }));

    res.sendStatus(200);
})




// app.post('/json-handler', bodyParser.json({limit:1}), (req,res) => {
//     console.log('hello there');
//     console.log(req.body);
//     console.log(res.statusCode);
//     res.sendStatus(200);
// })