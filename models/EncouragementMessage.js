const pg = require('pg'); 
const connectionString = process.env.DATABASE_URL || 'postgres://xpinxpapbpgtik:d9ba9bfd541f04e73814a1d4fd4dc1ccd46dfd8951cc10ef1332c201ec2a916c@ec2-50-17-220-223.compute-1.amazonaws.com:5432/dcu5qk7mjsm9e7'

const client = new pg.Client(connectionString); 
client.connect(); 

const query = client.query(
	'CREATE TABLE encouragement_messages(encouragement_message_id SERIAL PRIMARY KEY, message TEXT, datetimeposted TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
query.on('end', () => { client.end(); }); 
