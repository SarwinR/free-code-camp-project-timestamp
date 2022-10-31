// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
    // no args provided hence send current date
    if(req.params.date == null){
        let date = new Date()
        res.json({"unix" : date.valueOf(),
                 "utc": date.toUTCString() })
    }
    else{
        // args provided
        let stamp = null
        if(isNaN(req.params.date)) // the arg is in the string format
            stamp = req.params.date // keep the arg is in the string format
        else
            stamp = +req.params.date // convet the arg to an interger format
        
            
        let date = new Date(stamp)
        if (isNaN(date.getMonth())){ // cannot get the month component of the date hence not a valid date
            res.json({ error : "Invalid Date" })
        }
        else {
            res.json({"unix" : date.valueOf(),
                 "utc": date.toUTCString() })
        }
    }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
