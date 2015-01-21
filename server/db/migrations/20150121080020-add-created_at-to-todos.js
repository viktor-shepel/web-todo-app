var TABLE_NAME = 'todos';
var COLUMN_NAME = 'created_at'

exports.up = function(db, callback) {
  db.addColumn(TABLE_NAME, COLUMN_NAME, {type: 'datetime'}, callback);
};

exports.down = function(db, callback) {
  db.removeColumn(TABLE_NAME, COLUMN_NAME, callback);
};

