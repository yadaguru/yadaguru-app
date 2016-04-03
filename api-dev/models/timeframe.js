module.exports = function(sequelize, DataTypes) {

  return sequelize.define('timeframe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    formula: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

};
