const path = require('path');
const fs = require('fs');
const express = require('express');

const routes = express.Router();
const messageFilePath = path.join(__dirname, '../', 'data', 'messages.txt');

routes.get('/', (req, res) => {
  fs.readFile(messageFilePath, 'utf-8', (err, data) => {
    const messages = err ? '' : data;
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chat App</title>
      </head>
      <body>
        <header>
          <nav>
            <h1>Chat Here....</h1>
          </nav>
        </header>
        <div id="chat-box">
          ${messages
            .split('\n')
            .map((msg) => (msg ? `<p>${msg}</p>` : ''))
            .join('')}
        </div>
        <form action="/" method="post">
          <input type="text" name="message" placeholder="Type your message..." required />
          <button type="submit">Send</button>
        </form>
        <script>
          const username = localStorage.getItem('username') || 'Anonymous';

          document.querySelector('form').addEventListener('submit', function(event) {
            const messageInput = document.querySelector('[name="message"]');
            if (messageInput.value) {
              const hiddenInput = document.createElement('input');
              hiddenInput.type = 'hidden';
              hiddenInput.name = 'username';
              hiddenInput.value = username;
              this.appendChild(hiddenInput);
            }
          });
        </script>
      </body>
      </html>
    `;
    res.send(html);
  });
});

routes.post('/', (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).send('Both username and message are required!');
  }

  const formattedMessage = `${username}: ${message}`;

  fs.appendFile(messageFilePath, formattedMessage + '\n', (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).send('Could not save the message.');
    }
    res.redirect('/'); // Redirect back to the chat page
  });
});

module.exports = routes;
