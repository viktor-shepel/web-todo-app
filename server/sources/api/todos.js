'use strict'

var express = require('express');
var TodosModel = require('../models').Todos;

function getAllTodos(request, response, next) {
  TodosModel.all()
  .then(function(data) {
    response.send(data);
  }, function(error) {
    console.error(error);
  });
}

function getTodosById(request, response, next) {
  TodosModel.find(Number(request.params.id))
  .then(function(data) {
    response.send(data);
  }, function(error) {
    console.error(error);
  });
}

function createTodo(request, response, next) {
  TodosModel.create(request.body)
  .then(function(data) {
    response.send(data);
  }, function(error) {
    console.error(error);
  });
}

function updateTodo(request, response, next) {
  TodosModel.update(request.body, {where: {id: Number(request.params.id)}})
  .then(function(data) {
    response.send(data);
  }, function(error) {
    console.error(error);
  });
}

function deleteTodo(request, response, next) {
  TodosModel.destroy({where: {id: Number(request.params.id)}})
  .then(function(data) {
    response.send(204);
  }, function(error) {
    console.error(error);
  });
}

module.exports = express.Router()
  .get('/todos', getAllTodos)
  .get('/todos/:id', getTodosById)
  .post('/todos', createTodo)
  .put('/todos/:id', updateTodo)
  .delete('/todos/:id', deleteTodo);

