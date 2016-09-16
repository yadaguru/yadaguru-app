var validator = require('validator');

module.exports = function(sequelize, DataTypes) {

  var Timeframe = sequelize.define('Timeframe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    formula: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('relative', 'absolute', 'now'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['relative', 'absolute', 'now']],
          msg: 'type must be \'relative\', \'absolute\', or \'now\''
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Timeframe.belongsToMany(models.BaseReminder, {through: 'BaseReminderTimeframe'})
      }
    },
    validate: {
      formulaRequiredForRelativeOrAbsoluteType: function() {
        if (this.type !== 'now' && this.formula === null) {
          throw new Error('formula is required if timeframe type is relative or absolute');
        }
      },
      dateStringFormulaRequiredForAbsoluteType: function() {
        if (typeof this.formula === 'undefined') {
          throw new Error('formula is required and must be a valid ISO-8601 date string if type is absolute')
        }
        if (this.type === 'absolute' && !validator.isISO8601(this.formula)) {
          throw new Error('formula must be a valid ISO-8601 date string if type is absolute');
        }
      },
      positiveIntegerFormulaRequiredForRelativeType: function() {
        if (typeof this.formula === 'undefined') {
          throw new Error('formula is required and must be a positive integer if type if relative')
        }
        if (this.type === 'relative' && !validator.isInt(this.formula, {min: 0})) {
          throw new Error('formula must be a positive integer if type is relative') ;
        }
      }
    }
  });

  return Timeframe;

};
