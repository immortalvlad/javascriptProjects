var express = require('express');
var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectID;

var app = express();
var db = require('./db');
var artistsConroller = require('./controllers/artists');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.send('Hello API');
});

app.get('/artists', artistsConroller.all);

app.get('/artists/:id', artistsConroller.findById);

app.post('/artists', artistsConroller.create);

app.put('/artists/:id',artistsConroller.update);

app.delete('/artists/:id', artistsConroller.delete);


db.connect('mongodb://localhost:27017/myapi', function(err){
	if(err){
		return console.log(err);
	}
	app.listen(3012, function(){
		console.log('API app started');
	});
});