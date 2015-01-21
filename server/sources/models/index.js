'use strict'

function createConnectionUri(db_config) {
  return 'postgres://' + db_config.user + ':' + db_config.password + '@' + db_config.host + ':' + db_config.port + '/' + db_config.database;
}

var Sequelize = require("sequelize");
var path = require('path');
var DB_CONFIG = require(path.join(__dirname, '../../db/config.json')).development; // replace with dynamic enviorement
var connection = new Sequelize(createConnectionUri(DB_CONFIG));

module.exports = {
  Todos: {}
};

