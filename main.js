var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/listroutes'); //importing route
routes(app); //register the route
app.listen(port);

console.log('Meepybot API server started on: http://localhost:' + port);
