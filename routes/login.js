const path = require('path');

const express = require('express');

const routes = express.Router();

routes.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'login_form.html'));
});

routes.post('/login', (req, res, next) => {
  const username = req.body.username;
  if (username) {
    console.log(`Username received: ${username}`);
    res.redirect('/');
  } else {
    res.status(400).send('Username is required!');
  }
});

module.exports = routes;
