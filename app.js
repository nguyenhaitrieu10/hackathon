// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var http = require('http').Server(app);

mongoose.connect('mongodb://localhost:27017/location');
var Location = require('./models/location');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/', function(req, res, next) {
	Location.find({}, function(err, locations){
		if (err){
			return res.send('error');
		}
		console.log('########');
		console.log(locations);
		console.log('########');

		return res.render('index',{
  			'locations': locations,
  			'number': locations.length,
  		});
	});
});

app.post('/remove-all', function(req, res, next) {
	Location.remove({}, function(err, result){
		if (err)
			return res.send('error');
		return res.send('done');
	});
});

var io = require('socket.io')(http);
app.post('/add', function(req, res, next) {
	let newLocation = req.body.newLocation;

	console.log('----------');
	console.log(newLocation);
	console.log(typeof newLocation);
	console.log('----------');

	let location = new Location();
	location.lat = newLocation.lat;
	location.lng = newLocation.lng;

	console.log('$$$$$$$');
	console.log(location);
	console.log('$$$$$$$');

	if (location.lat && location.lng)
	{
		location.save(function(err, form){
        if (err) {
          return res.send('error');
        }
        io.emit('location', newLocation);
		res.send('ok');
      });
	}
	else
		res.send('error');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function(socket){
	// io.emit('location', msg);
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on ' + this.address().port);
});

module.exports = app;
