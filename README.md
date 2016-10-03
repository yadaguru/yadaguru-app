[![Stories in Ready](https://badge.waffle.io/yadaguru/yadaguru-app.png?label=ready&title=Ready)](https://waffle.io/yadaguru/yadaguru-app)
[![Build Status](https://travis-ci.org/yadaguru/yadaguru-app.svg?branch=master)](https://travis-ci.org/yadaguru/yadaguru-app)
[![Build status](https://ci.appveyor.com/api/projects/status/ab8l04js8huip9ja?svg=true)](https://ci.appveyor.com/project/adobley/yadaguru-app)
[![Coverage Status](https://coveralls.io/repos/yadaguru/yadaguru-app/badge.svg?branch=master&service=github)](https://coveralls.io/github/yadaguru/yadaguru-app?branch=master)
[![Code Climate](https://codeclimate.com/github/yadaguru/yadaguru-app/badges/gpa.svg)](https://codeclimate.com/github/yadaguru/yadaguru-app)

#YadaGuru
##College Application Reminders

Visit our [CodeForPhilly project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
 * Be sure you have installed `node` and `npm`
 * Be sure you have gulp installed globally `npm install -g gulp` 
 * Be Sure you have bower installed globally `npm install -g bower`
 * `cd` into the project root folder (if you are not already there)
 * Run `npm install` to install the front-end dependencies
 * Run `bower install` to install client-side libraries.
 
##Accessing the API Server
 * The API Server is located in a separate repo [here](https://github.com/yadaguru/yadaguru-api/). Clone this repo and follow the README there to set up the server.
 * Once the server is setup, run `npm start` to start the server. The server can be accessed at `http://localhost:3005`
 * See the [API Documentation](https://github.com/yadaguru/yadaguru-api/wiki/API-Documentation) for information on communicating with the API.

##Serving Locally
Run `gulp watch` to serve the front end of the project with browsersync on `localhost:9000`. While gulp is running the browser and server will be reloaded on every file change related to their domain.

##Gulp Commands
 * `gulp clean` to clear the dist directory.
 * `gulp build` to build all styles, scripts and HTML files.
 * `gulp watch` to watch for changes and enable BrowserSync.
 
##Contributing

 * Please fork the repo, checkout the `master` branch and create a feature branch from there.
 * Please make all PR against the `master` branch. 
