#YadaGuru
##College Application Reminders

Visit our [CodeForPhily project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
Clone this repo onto your local machine. Be sure that node and npm are installed. Run `npm install` to install all dependencies. Then, cd into the `app` folder and run `bower install` to install all bower components.

##Serving Locally
Run `gulp serve-dev` to serve the project with browsersync on `localhost:9000` or `gulp serve-dev --nosync` to serve without browsersync on port 3000. While gulp is running, changes to css will automatically be minified, and the browser will be reloaded on every file change.

##The Excel File
The Excel file found at the root of this folder contains all of the date reminders and messages for the generated reminders.
