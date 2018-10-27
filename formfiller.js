// Copyright 2018, Quvalis


var http = require("http");
var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
 
// Running Server Details.
if (module === require.main) {
var server = app.listen( process.env.PORT || 8080, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
}
 
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  var html='';
  html +="<body>";
  html +="<div>";
  html +="<link href='formfiller.css' rel='stylesheet' type='text/css'>"
  html += "<form action='/output'  method='post' name='form1'>";
  html += "Full Name:</p><input type='text' name='fullname'>";
  html += "Email:</p><input type='text' name='email'>";
  html += "address:</p><input type='text' name='address'>";
  html += "Mobile number:</p><input type='text' name='mobilno'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</div>";
  html += "</body>";
  res.send(html);
});
 
app.post('/output', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is " + req.body.fullname + "<BR>";
  reply += "Your E-mail id is " + req.body.email + "<BR>"; 
  reply += "Your address is " + req.body.address + "<BR>";
  reply += "Your mobile number is " + req.body.mobilno + "<BR>";
  res.send(reply);
 });
