var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('catalog', ['products']); //array of collections we want to work with

app.get('/', function(req, res){
  res.send("It appears to be working, sir!")
});

app.get('/products', function(req, res){
  console.log(" Products appears to be working, sir!");
  db.products.find(function(err, docs) {
      if(err) {
        res.send(err);
      }
      else {
        console.log("Sending Products Data...");
        res.json(docs);
      }
  });
});

app.listen(3000);
console.log('Server is running on port 3000, broski!')
