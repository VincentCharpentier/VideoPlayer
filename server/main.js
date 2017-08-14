'use strict';

import express from 'express';
import path from 'path';

// import bodyParser from 'body-parser';

import ApiRouter from './api';

const app = express();

// ------------------- BEGIN: CONFIG
const port = 3000;
// ------------------- END:   CONFIG

// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json()); // for parsing application/json

const publicDir = path.resolve(__dirname, '../public');

// try to match public ressource
app.use('/', express.static(publicDir));
// try to match api function
app.use('/api', ApiRouter);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  console.log("test")
  res.sendFile(path.resolve(publicDir, 'index.html'));
});

app.listen(port, function() {
	console.log("Server Started at port 3000");
});
