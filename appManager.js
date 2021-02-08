const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();
const cors = require('cors');
const morgan = require ('morgan');
const async = require('async');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

const dashboardRoutes = require('./routes/dashboard.routes.js');

// using as middleware
//app.use('/dashboard', smsRoutes);

// Root handler
app.get('/', function (req, res) {
    /*
    client.send_command('select', [10], redis.print);
    var r = {};

    client.keys('*', function(err, keys) {
        async.each(keys, function(key, callback) {
        client.get(key, function(err, value) {
        r[key] = value;
        callback(err);
        });
    }, function() {
            // when callback is finished
            console.log(JSON.stringify(r));
            client.quit();
        });
    });

  res.send('Bem-vindo ao Dashboard da AdeM!<br /><a href="https://github.com/guevanjr/appManager/#readme">Git README</a><br />' + JSON.stringify(r));
  */
    res.json({
        message: 'Dashboard da AdeM'
    });
})

app.post('/dashboard', function (req, res) {
    client.send_command('scan', [100], redis.print);
    var r = {};

    client.keys('*', function(err, keys) {
        async.each(keys, function(key, callback) {
        client.get(key, function(err, value) {
        r[key] = value;
        callback(err);
        });
    }, function() {
            // when callback is finished
            console.log(JSON.stringify(r));
            res.json(JSON.stringify(r))
            client.quit();
        });
    });


})

// Launch the server and listen
const port = process.env.PORT || 6000;
app.listen(port, function () {
    console.log('Listening to Dashboard App on port ' + port);

    // Connect REDIS Database
    client.on('connect', function() {
        console.log('Redis connected ...')
    })
});