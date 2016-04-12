'use strict';
var models = require('../models/index');
var response = require('../lib/response');
var moment = require('moment');
var User = models.User;

var user = {};

user.login = function(data, res) {

  // If only phone number was provided, generate confirm code
  if (Object.keys(data).length === 1 && Object.keys(data)[0] === 'phoneNumber') {
    user._initializeUserLogin(data, res);
  } else {
    user._authenticate(data, res);
  }

};

user._initializeUserLogin = function (data, res) {

  User.findAll({
    phoneNumber: data.phoneNumber
  })
    .then(user._maybeAddUser(res, data))
    .catch(response.getErrorHandler(res));

};

user._maybeAddUser = function(res, data) {
  return function (response) {
    if (response.length === 0) {
      user._registerNewUser(res, data)
    } else {
      user._loginExistingUser(res, data)
    }
  }
};

user._registerNewUser = function(res, data) {
  var code = user._getSixDigitCode();

  User.create({
      phoneNumber: data.phoneNumber,
      confirmCode: code,
      confirmCodeExpires: user._getExpireTime(1)
    })
    .then(user._sendConfirmCode(res, code))
    .catch(response.getErrorHandler(res));
};

user._loginExistingUser = function(res, data) {
  var code = user._getSixDigitCode();

  User.update({
    confirmCode: code,
    confirmCodeExpires: user._getExpireTime(1)
  }, {
    where: {
      phoneNumber: data.phoneNumber
    },
    returning: true
  })
    .then(user._sendConfirmCode(res, code))
    .catch(response.getErrorHandler(res));
};

user._getSixDigitCode = function() {

  var code = Math.floor(Math.random() * 999999);
  return String("000000" + code).slice(-6);

};

user._getExpireTime = function (minutes) {

  return moment().add(minutes, 'minutes').toISOString();

};

user._sendConfirmCode = function (res, code) {
  return function() {
    // TODO Twilio magic will happen here! :-)
    if (process.env.NODE_ENV === 'development') {
      res.status(200).send([code]);
    } else {
      res.status(200).send([]);
    }
  }
};

user._authenticate = function (data, res) {

  User.findAll({
    where: {
      phoneNumber: data.phoneNumber,
      confirmCode: data.confirmCode,
      confirmCodeExpires: {gt: moment().toISOString()}
    }
  })
    .then(function(resp) {

      // TODO - JWT Stuff Here
      // TODO - Clear out confirmCode from DB after this step
      // TODO - Better error handling
      if (resp.length > 0) {
        res.status(200).send([]);
      } else {
        res.status(403).send([]);
      }

    })
    .catch(function(error) {
      res.status(500).send(error);
    })

};

module.exports = user;