module.exports = function(sequelize, DataTypes) {

  var Reminder = sequelize.define('Reminder', {
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
    },
    timeframe: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Reminder.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
        Reminder.belongsTo(models.School, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Reminder;

};
