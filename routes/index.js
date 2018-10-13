var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('recieved');
  	res.render('index');
});

router.post('/add', function(req, res, next) {
	let newLocation = req.body.newLocation;
	
});

module.exports = router;
