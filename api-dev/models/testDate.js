module.exports = function(sequelize, DataTypes) {

  var TestDate = sequelize.define('TestDate', {
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    adminDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        TestDate.belongsTo(models.Test, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return TestDate;

};
