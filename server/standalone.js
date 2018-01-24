'use strict';

const express = require('express');
const setupServer = require('./server');

const app = express();
setupServer(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Production Express server running at localhost:', PORT);
});
