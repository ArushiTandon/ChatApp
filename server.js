const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.get('/', (req, res) => {
  fs.readFile('details.txt', 'utf-8', (err, data) => {
    if(err){
      console.log(err);
     data = 'No chat exists';
    }
    res.send(`
      ${data}
      <form id="chatForm" action="/" method="POST">
        <input type="text" id="message" name="message" placeholder="Enter your message">
        <input type="hidden" id="username" name="username">
        <br/>
        <button type="submit">Send</button>
      </form>
      <script>
        // Before submitting the form, retrieve the username from localStorage and attach it to the form
        document.getElementById('chatForm').addEventListener('submit', function(event) {
          const username = localStorage.getItem('username');
          if (username) {
            document.getElementById('username').value = username;
          }
        });
      </script>
    `);
  })
});

//abcd
app.get('/login', (req, res) => {
  res.send(`
    <form action="/" method="GET" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <input type="text" id="username" name="username" placeholder="Enter username" required>
        <br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/', (req, res) => {
  const username = req.body.username;
  const message = req.body.message; 
  
  fs.writeFile("details.txt", `${username}: ${message}` ,{flag: 'a'} ,(err) => {
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(1000);