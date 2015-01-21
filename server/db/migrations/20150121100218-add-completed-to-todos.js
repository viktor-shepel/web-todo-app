var TABLE_NAME = 'todos';
var COLUMN_NAME = 'completed';

exports.up = function(db, callback) {
  db.addColumn(TABLE_NAME, COLUMN_NAME, {type: 'boolean'}, callback);
};

exports.down = function(db, callback) {
  db.removeColumn(TABLE_NAME, COLUMN_NAME, callback);
};

