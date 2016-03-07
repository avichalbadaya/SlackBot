/*** Created by badayaa on 3/4/16. ***/

// Module dependencies
var express = require('express'),
    routes= require('./routes/index.js');

// Configuration
var app = express();

//routes
app.get(['/','/_health'],routes.health);

// default port would be port 80, set enviornment variable PORT to use another port
// this call also triggers slack bot communication

app.listen(process.env.PORT || 80,routes.slack_hear);
module.exports = app;