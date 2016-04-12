module.exports = function(sequelize, DataTypes) {

  var ContentItem = sequelize.define('ContentItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return ContentItem;

};
