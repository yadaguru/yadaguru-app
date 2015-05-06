var pg = require('pg');
// TODO: Username & Password should be moved out into config file
var connectionString = process.env.DATABASE_URL ||
    'postgres://vagrant:vagrant@localhost:5432/yadaguru';
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE formulas(id SERIAL PRIMARY KEY,'
      + 'name VARCHAR(40) not null, formula TEXT not null)');
query.on('end', function() { client.end(); });
