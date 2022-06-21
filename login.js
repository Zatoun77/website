const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sqlBINKS13',
  database : 'nodelogin'
});

const app = express();

// JSP
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('public'));


// http://localhost:3000/ | Page d'accueil.
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        request.session.power = results[0].power;
        // Redirect to home page
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }     
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
  // Login
  if (request.session.loggedin) {

    switch (request.session.power) {
      case 3:
        response.send('Le plus bo');
        break;
      case 2:
        response.send('yo bg !');
        break
      case 1:
        response.send('Clodo !');
        break;
      default:
        response.send("T ki ?");
    }
  } 

  else {
    // Login fail
    response.send('Please login to view this page!');
  }
  response.end();
});

app.listen(3000);