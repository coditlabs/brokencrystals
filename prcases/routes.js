const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const http = require('http');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({ host: 'localhost', user: 'app', database: 'app' });

// sql-injection: express.Request.query -> sql sink
app.get('/user', function (req, res) {
  const id = req.query.id;
  db.query("SELECT * FROM users WHERE id = '" + id + "'", function (err, rows) {
    res.json(rows);
  });
});

// command-injection: express.Request.query -> os_command sink
app.get('/ping', function (req, res) {
  const host = req.query.host;
  exec('ping -c 1 ' + host, function (err, stdout) {
    res.send(stdout);
  });
});

// path-traversal: express.Request.query -> file_path sink
app.get('/doc', function (req, res) {
  const name = req.query.name;
  fs.readFile('/var/data/' + name, 'utf8', function (err, body) {
    res.send(body);
  });
});

// ssrf: express.Request.query -> outbound_url sink
app.get('/fetch', function (req, res) {
  const target = req.query.url;
  http.get(target, function (upstream) {
    upstream.pipe(res);
  });
});

// xss: express.Request.query -> html_output sink
app.get('/greet', function (req, res) {
  const name = req.query.name;
  res.send('<h1>Hello ' + name + '</h1>');
});

// hardcoded-secret: constant -> credential sink (jwt sign)
const TOKEN_SECRET = 'Pr0d-Jwt-S1gning-K3y-9f2a';
app.get('/token', function (req, res) {
  const token = jwt.sign({ user: req.query.user }, TOKEN_SECRET);
  res.json({ token: token });
});

module.exports = app;
