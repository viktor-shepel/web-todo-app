module.exports = function(sequelize) {
  'use strict'

  var Sequelize = require("sequelize");

  var Todos = sequelize.define('todos', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    message: Sequelize.STRING
  }, {
    underscored: true
  });

  return Todos;
}

