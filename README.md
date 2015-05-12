#YadaGuru
##College Application Reminders

Visit our [CodeForPhily project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
Clone this repo onto your local machine. Be sure that node and npm are installed. Run `npm install` to install all dependencies. Then, cd into the `app` folder and run `bower install` to install all bower components.

##Configuration
Currently we support postgresql for the data source. In order to configure
postgresql you will need to set up a database and account then place the
connectionString in config/db/postgresql.json. It should be fairly straight
forward but we will expand out the documentation as we go.

Next you will need to run `node provision/postgresql.js` to setup the table.

Currently postgresql is setup as the default database as long as NODE_DB is not
defined as an environmental variable. Support will be added for other database
structures using NODE_DB as the switch. This name will correspond to the config
json and data layer. In order to run a it with a one liner use `export
NODE_DB=databaseName && node app.js`

##Serving Locally
Run `gulp watch` to serve the project locally at `localhost:3000`. While gulp is running, changes to css will automatically be minified, and the browser will be reloaded on every file change.

##The Excel File
The Excel file found at the root of this folder contains all of the date formulas and messages for the generated reminders.
