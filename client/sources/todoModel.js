// modification of original sources @ https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/todoModel.js
(function () {
    'use strict';

    var Utils = require('./utils.js');
    var errorLogger = console.log.bind(console);
    // Generic "model" object. You can use whatever
    // framework you want. For this application it
    // may not even be worth separating this logic
    // out, but we do this to demonstrate one way to
    // separate out parts of your application.
    var TodoModel = function (data_provider) {
        this.todos = [];
        this.onChanges = [];
        this.data_provider_ = data_provider;
        this.fetchLatestTodos_();
    };

    TodoModel.prototype.setTodos_ = function (todos) {
        this.todos = todos;
        this.inform();
    };

    TodoModel.prototype.fetchLatestTodos_ = function () {
        this.data_provider_.getTodoList()
        .done(this.setTodos_.bind(this))
        .fail(errorLogger);
    };

    TodoModel.prototype.appendTodo_ = function (todo) {
        this.todos = this.todos.concat(todo);
        this.inform();
    };

    TodoModel.prototype.removeTodo_ = function (todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });
        this.inform();
    };

    TodoModel.prototype.subscribe = function (onChange) {
        this.onChanges.push(onChange);
    };

    TodoModel.prototype.inform = function () {
        this.onChanges.forEach(function (cb) { cb(); });
    };

    TodoModel.prototype.addTodo = function (title) {
        this.data_provider_.createTodo({title: title, completed: false})
        .done(this.appendTodo_.bind(this))
        .fail(errorLogger);
    };

    TodoModel.prototype.toggleAll = function (checked) {
        // Note: it's usually better to use immutable data structures since they're
        // easier to reason about and React works very well with them. That's why
        // we use map() and filter() everywhere instead of mutating the array or
        // todo items themselves.
        this.todos = this.todos.map(function (todo) {
            return Utils.extend({}, todo, {completed: checked});
        });

        this.inform();
    };

    TodoModel.prototype.toggle = function (todoToToggle) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToToggle ?
                todo :
                Utils.extend({}, todo, {completed: !todo.completed});
        });

        this.inform();
    };

    TodoModel.prototype.destroy = function (todo) {
        this.data_provider_.deleteTodo(todo)
        .done(this.removeTodo_.bind(this, todo))
        .fail(errorLogger);
    };

    TodoModel.prototype.save = function (todoToSave, text) {
        todoToSave.title = text;
        this.data_provider_.updateTodo(todoToSave)
        .done(this.fetchLatestTodos_.bind(this))
        .fail(errorLogger);
    };

    TodoModel.prototype.clearCompleted = function () {
        this.todos = this.todos.filter(function (todo) {
            return !todo.completed;
        });

        this.inform();
    };

    module.exports = TodoModel;
})();

