var http = require("http");
var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "cominium",
  password: "cominium",
  database: "cominium_schema"
});

 
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  var html='';
  html +="<body>";
  html +="<link href='formfiller.css' rel='stylesheet' type='text/css'>"
  html += "<form action='/output'  method='post' name='form1'>";
  html += "Name:</p><input type='text' name='name'>";
  html += "Address 1:</p><input type='text' name='address1'>";
  html += "Address 2:</p><input type='text' name='address2'>";
  html += "Locality:</p><input type='text' name='locality'>";
  html += "PostCode:</p><input type='text' name='postcode'>";
  html += "Owner Contact - Name:</p><input type='text' name='ownercontactname'>";
  html += "Owner Contact - Mobile:</p><input type='text' name='ownercontactmobil'>";
  html += "Admin Contact - Name:</p><input type='text' name='admincontactname'>";
  html += "Admin Contact - Mobile:</p><input type='text' name='admincontactmobile'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/output', urlencodedParser, function (req, res){

if(!con._connectCalled ) 
{
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}
else
{
 console.log("Already connected!");
};

  var sql = "INSERT INTO condominium (";
  sql += "idCondominium, ";
  sql += "Name, ";
  sql += "Address1, ";
  sql += "Address2, ";
  sql += "Locality, ";
  sql += "PostCode, ";
  sql += "OwnerContact_Name, ";
  sql += "OwnerContact_Mobile, ";
  sql += "AdminContact_Name, ";
  sql += "AdminContact_Mobile ";
  sql += ") VALUES (";
  sql += " null,";
  sql += " '" + req.body.name + "',";
  sql += " '" + req.body.address1 + "',";
  sql += " '" + req.body.address2 + "',";
  sql += " '" + req.body.locality + "',";
  sql += " '" + req.body.postcode + "',";
  sql += " '" + req.body.ownercontactname + "',";
  sql += " '" + req.body.ownercontactmobile + "',";
  sql += " '" + req.body.admincontactname + "',";
  sql += " '" + req.body.admincontactmobile + "' ";
  sql += ")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });



  var reply="Condominium entry:" + "<BR>";
  reply += "Name is " + req.body.name + "<BR>";
  reply += "Address 1 is " + req.body.address1 + "<BR>"; 
  reply += "Address 2 is " + req.body.address2 + "<BR>";
  reply += "Locality is " + req.body.locality + "<BR>";
  reply += "Post Code is " + req.body.postcode + "<BR>";
  reply += "Owner Contact - Name is " + req.body.ownercontactname + "<BR>";
  reply += "Owner Contact - Mobile is " + req.body.ownercontactmobile + "<BR>";
  reply += "Admin Contact - Name is " + req.body.admincontactname + "<BR>";
  reply += "Admin Contact - Mobile is " + req.body.admincntactmobile + "<BR>";
  res.send(reply);
 });

