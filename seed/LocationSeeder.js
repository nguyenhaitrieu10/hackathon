var Location = require('../models/location.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/location');

var locations = [
	new Location({
		lat: 10.759631,
		lng: 106.608155,
	}),
];


var done = 0;
for (var i = 0; i < locations.length; ++i){
	locations[i].save(function(err, res){
		done++;
		if (done === locations.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}
