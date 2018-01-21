'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const path = require('path');
const setupServer = require('./server');

const app = express();
app.use(express.static(path.join(__dirname, './public')));
setupServer(app);

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
