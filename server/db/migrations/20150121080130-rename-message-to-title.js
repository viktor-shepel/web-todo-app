var TABLE_NAME = 'todos';
var OLD_COLUMN_NAME = 'message';
var NEW_COLUMN_NAME = 'title';

exports.up = function(db, callback) {
  db.renameColumn(TABLE_NAME, OLD_COLUMN_NAME, NEW_COLUMN_NAME, callback);
};

exports.down = function(db, callback) {
  db.renameColumn(TABLE_NAME, NEW_COLUMN_NAME, OLD_COLUMN_NAME, callback);
};

