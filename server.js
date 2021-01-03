var express = require('express');

var app = express();

app.use(express.static('dist'));

app.listen(3001, () => {
  console.log('Listening at localhost:3001');
});