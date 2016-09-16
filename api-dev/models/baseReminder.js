module.exports = function(sequelize, DataTypes) {

  var BaseReminder = sequelize.define('BaseReminder', {
    name: {
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
    },
    lateMessage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lateDetail: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        BaseReminder.belongsTo(models.Category, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
        BaseReminder.belongsToMany(models.Timeframe, {
          through: 'BaseReminderTimeframe'
        });
      }
    }
  });

  return BaseReminder;

};
