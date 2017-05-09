var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
	res.send(artists);
});

app.get('/artists/:id', function(req, res){
	var artist = artists.find(function(artist){
		return artist.id === Number(req.params.id);
	});
	res.send(artist);
});


app.listen(3012, function(){
	console.log('API app started');
});