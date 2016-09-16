module.exports = function(sequelize, DataTypes) {

  var Test = sequelize.define('Test', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Test.hasMany(models.TestDate)
      }
    }
  });

  return Test;

};
