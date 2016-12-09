[![Stories in Ready](https://badge.waffle.io/yadaguru/yadaguru-app.png?label=ready&title=Ready)](https://waffle.io/yadaguru/yadaguru-app)
[![Build Status](https://travis-ci.org/yadaguru/yadaguru-app.svg?branch=master)](https://travis-ci.org/yadaguru/yadaguru-app)
[![Build status](https://ci.appveyor.com/api/projects/status/ab8l04js8huip9ja?svg=true)](https://ci.appveyor.com/project/adobley/yadaguru-app)
[![Coverage Status](https://coveralls.io/repos/yadaguru/yadaguru-app/badge.svg?branch=master&service=github)](https://coveralls.io/github/yadaguru/yadaguru-app?branch=master)
[![Code Climate](https://codeclimate.com/github/yadaguru/yadaguru-app/badges/gpa.svg)](https://codeclimate.com/github/yadaguru/yadaguru-app)

#YadaGuru
##College Application Reminders

Visit our [CodeForPhilly project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
Please see [Yadaguru Dev Environment Setup](https://github.com/yadaguru/yadaguru-app/wiki/Yadaguru-Dev-Environment-Setup)
for step by step instructions on getting the entire Yadaguru stack up-and-running on your machine.

##Gulp Commands
 * `gulp clean` to clear the dist directory.
 * `gulp build` to build all styles, scripts and HTML files.
 * `gulp watch` to watch for changes and enable BrowserSync.

## Logging In
To log into Yadaguru, create an account (locally) by entering your phone number. The confirmation code
is logged to the console in development environments.

##Resetting local data.
Yadaguru stores some flags indicating that you have logged in, completed onboarding, etc. in local storage.
You may want to reset these values and "start over" during the course of development. This can be done in the
UI (click the speech bubble, then 'Forget my mobile phone number'). You can also drop into dev tools, and
manually clear all of the `yg`-prefixed values. This option has the advantage of not deleting your data
from the database.
 
##Contributing

 * Please fork the repo, checkout the `master` branch and create a feature branch from there.
 * Please make all PR against the `master` branch. 
