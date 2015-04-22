var application_root = __dirname,
	express          = require('express'),
	bodyParser		 = require('body-parser'),
	path 			 = require('path'),
	morgan 			 = require('morgan'),
	models 	 	 	 = require('./models'),
	locationRouter   = require('./routers/location_router.js'),
	regulationsRouter = require('./routers/parking_regulation_router.js');

var app = express();

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('dev'));
}


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(express.static('./browser'));

app.use('/locations', locationRouter);
app.use('/regulations', regulationsRouter);

module.exports = app;
