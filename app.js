const http = require('http');

const express = require('express');

const loginPage = require('./routes/login');
const mainPage = require('./routes/main');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(loginPage);
app.use(mainPage);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Listening');
});
