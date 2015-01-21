'use strict';

var TodoProviderInterface = require('./to-do-provider-interface.jsx');

function TodoProviderDB() {
  'use strict';
   var $ = require('jquery-browserify');
   this.ajax_ = $.ajax.bind($);
}

TodoProviderDB.prototype = Object.create(TodoProviderInterface.prototype);

TodoProviderDB.prototype.getTodoList = function() {
  return this.ajax_({url: '/api/todos', type: 'GET'});
};

TodoProviderDB.prototype.getTodo = function(id) {
  return this.ajax_({url: '/api/todos/' + id, type: 'GET'});
};

TodoProviderDB.prototype.createTodo = function(record) {
  return this.ajax_({url: '/api/todos', type: 'POST', data: record});
};

TodoProviderDB.prototype.updateTodo = function(record) {
  return this.ajax_({url: '/api/todos/' + record.id, type: 'PUT', data: record});
};

TodoProviderDB.prototype.deleteTodo = function(record) {
  return this.ajax_({url: '/api/todos/' + record.id, type: 'DELETE'});
};

module.exports = TodoProviderDB;

