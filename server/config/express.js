var morgan         = require('morgan'),
    methodOverride = require('method-override'),
    path           = require('path'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),
    passport       = require('passport'),
    express        = require('express'),
    account        = require('../account'),
    app            = express();

module.exports = function(clientPath) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json '}));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({
    secret: 'Not a good secret',
    resave: true,
    saveUninitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static(path.join(clientPath, 'root')));
  app.use('/login', express.static(path.join(clientPath, 'login')));
  app.use('/vendor', express.static(path.join(clientPath, 'vendor')));
  app.use('/common', express.static(path.join(clientPath, 'common')));
  app.use('/css', express.static(path.join(clientPath, 'css')));
  app.use('/assets', express.static(path.join(clientPath, 'assets')));
  app.use('/admin', account.requiresRole('admin'),
            express.static(path.join(clientPath, 'admin')));

  return app;
};
