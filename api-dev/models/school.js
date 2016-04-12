module.exports = function(sequelize, DataTypes) {

  var School = sequelize.define('School', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        School.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return School;

};
