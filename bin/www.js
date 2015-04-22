var app = require('../server');

app.set('port', process.env.port || 9888);

app.listen(app.get('port'), function () {
	console.log('listening on port 9888');
});