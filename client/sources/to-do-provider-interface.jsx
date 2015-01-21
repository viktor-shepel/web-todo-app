/*
 * TodoProviderInterface provides persistance abstraction for
 * `todo` entity i.e. DB, LocalStorage, ServiceWorkers ...
 */

'use strict';

function TodoProviderInterface() {
  'use strict';
}

/* @return {Promise<Array<Object>>} */
TodoProviderInterface.prototype.getTodoList = function() {
  throw new Error('interface method');
};

/* @return {Promise<Object>} */
TodoProviderInterface.prototype.getTodo = function(id) {
  throw new Error('interface method');
};

/* @return {Promise<Object>} */
TodoProviderInterface.prototype.createTodo = function(record) {
  throw new Error('interface method');
};

/* @return {Promise<Object>} */
TodoProviderInterface.prototype.updateTodo = function(record) {
  throw new Error('interface method');
};

/* @return {Promise<Object>} */
TodoProviderInterface.prototype.deleteTodo = function(record) {
  throw new Error('interface method');
};

module.exports = TodoProviderInterface;

