var express = require('express');
var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectID;

var app = express();
var db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
	{
		id: 1,
		name: 'Metallica'
	},
	{
		id: 2,
		name: 'Metallica2'
	},
	{
		id: 3,
		name: 'someother'
	},
];

app.get('/', function(req, res){
	res.send('Hello API');
});

app.get('/artists', function(req, res){

	db.get().collection("artists").find().toArray(function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
//	res.send(artists);
});

app.get('/artists/:id', function(req, res){
	db.get().collection("artists").findOne({_id: ObjectId(req.params.id)}, function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});

app.post('/artists', function(req, res){
	var artist = {
		name: req.body.name
	};
	db.get().collection('artists').insert(artist, function(err, result){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(artist);
	});
//	res.send(artist);
});

app.put('/artists/:id', function(req, res){
	db.get().collection('artists').updateOne(
			{_id: ObjectId(req.params.id)},
	{name: req.body.name},
	function(err, result){
		if(err){
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	}
	);
});

app.delete('/artists/:id', function(req, res){
	db.get().collection('artists').deleteOne(
			{_id: ObjectId(req.params.id)},
	function(err, result){
		if(err){
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	}
	);
});


db.connect('mongodb://localhost:27017/myapi', function(err){
	if(err){
		return console.log(err);
	}
	app.listen(3012, function(){
		console.log('API app started');
	});
});