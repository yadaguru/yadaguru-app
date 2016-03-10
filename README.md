[![Stories in Ready](https://badge.waffle.io/yadaguru/yadaguru-app.png?label=ready&title=Ready)](https://waffle.io/yadaguru/yadaguru-app)
[![Build Status](https://travis-ci.org/yadaguru/yadaguru-app.svg?branch=master)](https://travis-ci.org/yadaguru/yadaguru-app)
[![Build status](https://ci.appveyor.com/api/projects/status/ab8l04js8huip9ja?svg=true)](https://ci.appveyor.com/project/adobley/yadaguru-app)
[![Coverage Status](https://coveralls.io/repos/yadaguru/yadaguru-app/badge.svg?branch=master&service=github)](https://coveralls.io/github/yadaguru/yadaguru-app?branch=master)
[![Code Climate](https://codeclimate.com/github/yadaguru/yadaguru-app/badges/gpa.svg)](https://codeclimate.com/github/yadaguru/yadaguru-app)

#YadaGuru
##College Application Reminders

Visit our [CodeForPhily project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
 * Be sure you have installed `node`, `npm`, and `vagrant`
 * `cd` into the project root folder (if you are not already there)
 * Run `npm install` to install the front-end dependencies
 * Run `bower install` to install client-side libraries
 * `cd` into `/api-dev`.
 * Run `npm install` to install the API development server dependencies.
 * Run `vagrant up` to bring up the API development server. On first up, this will provision the server and database.
 
##Accessing the API Development Server
 * The API Development Server can be accessed at `http://localhost:3000`. See the [API Documentation](https://github.com/yadaguru/yadaguru-app/wiki/API-Documentation)
 page of the wiki

##Serving Locally
Run `gulp watch` to serve the front end of the project with browsersync on `localhost:9000`. While gulp is running the browser and server will be reloaded on every file change related to their domain.

##Gulp Commands
 * `gulp clean` to clear the dist directory.
 * `gulp build` to build all styles, scripts and HTML files.
 * `gulp watch` to watch for changes and enable BrowserSync.
 
##Reprovisioning the API Dev Server Database
 * Upon running `vagrant up` for the first time, the database will provision itself, by running the sql commands in `/api-dev/provision.sql`. 
 To re-provision the database, run `vagrant up --provision`.
 
##Contributing

 * Please fork the repo, checkout the `development` and create a feature branch from there.
 * Please make all PR against the `development` branch. 
