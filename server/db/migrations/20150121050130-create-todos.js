var TABLE_NAME = 'todos';

exports.up = function(db, callback) {
  db.createTable(TABLE_NAME, {
    id: {type: 'int', primaryKey: true},
    message: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable(TABLE_NAME, callback);
};

