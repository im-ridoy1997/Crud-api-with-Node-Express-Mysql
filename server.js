const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use( bodyParser.json());



app.use('/', route);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})