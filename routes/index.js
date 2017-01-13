var express = require('express');
var router = express.Router();
var pg = require('pg'); 
var path = require('path'); 
const connectionString = process.env.DATABASE_URL || 'postgres://xpinxpapbpgtik:d9ba9bfd541f04e73814a1d4fd4dc1ccd46dfd8951cc10ef1332c201ec2a916c@ec2-50-17-220-223.compute-1.amazonaws.com:5432/dcu5qk7mjsm9e7'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/sispray', (req, res, next) => {
	const results = []; 

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if (err) {
			done(); 
			console.log(err);
			return res.status(500).json({success: false, data: err}); 
		}

		// SQL Query > Select Data
		const query = client.query('SELECT * FROM encouragement_messages ORDER BY encouragement_message_id ASC;'); 

		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row); 
		});

		// After all data is returned, close connection and return results 
		query.on('end', () => {
			done; 
			return res.json(results); 
		});
	});
});

router.get('/api/v1/sispray/initialize', (req, res, next) => {
	const results = []; 

	pg.connect(connectionString, (err, client, done) => {

		// Handle connection errors
		if (err) {
			done(); 
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('CREATE TABLE encouragement_messages(encouragement_message_id SERIAL PRIMARY KEY, message TEXT, datetimeposted TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
		query.on('end', () => {
			done();
		});
	});
});

module.exports = router;
