'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const setupServer = require('./server');

const app = express();
setupServer(app);

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
