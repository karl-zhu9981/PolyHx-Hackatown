const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

var breakfast = [];
var lunch = [];
var dinner = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  var length = req.body.Body.length;
  

  if (req.body.Body.substr(0, 13) == 'Add breakfast') {
    breakfast.push(req.body.Body.substr(14, length-1));
  } else if (req.body.Body.substr(0, 9) == 'Add lunch') {
    lunch.push(req.body.Body.substr(10, length-1));
  } else if (req.body.Body.substr(0, 10) == 'Add dinner') {
    dinner.push(req.body.Body.substr(11, length-1));
  } else if (req.body.Body == 'Get breakfast') {
    twiml.message('Here are your foods for breakfast: ' + breakfast.join(', '));
  } else if (req.body.Body == 'Get lunch') {
    twiml.message('Here are your foods for lunch: ' + lunch.join(', '));
  } else if (req.body.Body == 'Get dinner') {
    twiml.message('Here are your foods for dinner: ' + dinner.join(', '));
  } else if (req.body.Body == 'Reset') {
    breakfast = [];
    lunch = [];
    dinner = [];
  } else {
    twiml.message(
      'Invalid command'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
