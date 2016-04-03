module.exports = function(sequelize, DataTypes) {

  return sequelize.define('baseReminder', {
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
  });

};
