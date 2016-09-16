module.exports = function(sequelize, DataTypes) {

  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.BaseReminder)
      }
    }
  });

  return Category;

};
