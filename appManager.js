const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();

app.use(bodyParser.raw({ type: function() {
    return true;
},
limit: '5mb'
}));

//const smsRoutes = require('./routes/sms.routes.js');

// using as middleware
//app.use('/sms', smsRoutes);

// Root handler
app.get('/', function (req, res) {
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
  res.send('Bem-vindo a AdeM!<br /><a href="https://github.com/guevanjr/appManager/#readme">Git README</a><br>' + JSON.stringify(r));
})

app.post('/', function (req, res) {
    res.send('');
})

// Launch the server and listen
var port = 6000;
app.listen(port, function () {
    console.log('Listening to Dashboard App on port ' + port);

    // Connect REDIS Database
    client.on('connect', function() {
        console.log('Redis connected ...')
    })
});