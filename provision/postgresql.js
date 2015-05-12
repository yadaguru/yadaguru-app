var pg = require('pg'),
    nconf = require('nconf');

nconf.argv().env();
nconf.file('db', 'config/db/postgresql.json');

var connectionString = nconf.get('connectionString');
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE formulas(id SERIAL PRIMARY KEY,'
      + 'name VARCHAR(40) not null, formula TEXT not null)');
query.on('end', function() { client.end(); });
