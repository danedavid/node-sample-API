const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/db');
const routes = require('./app/routes');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(db.url);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  routes(app, conn);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
