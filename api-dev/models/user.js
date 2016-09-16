module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    confirmCode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [6, 6]
      }
    },
    confirmCodeExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.School);
        User.hasMany(models.Reminder);
      }
    }
  });

  return User;

};
