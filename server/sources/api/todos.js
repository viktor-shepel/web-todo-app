'use strict'

var express = require('express');
var logger = require('../logger.js');
var TodosModel = require('../models').Todos;

function getAllTodos(request, response, next) {
  TodosModel.all()
  .then(response.send.bind(response), logger);
}

function getTodosById(request, response, next) {
  TodosModel.find(Number(request.params.id))
  .then(response.send.bind(response), logger);
}

function createTodo(request, response, next) {
  TodosModel.create(request.body)
  .then(response.send.bind(response), logger);
}

function updateTodo(request, response, next) {
  TodosModel.update(request.body, {where: {id: Number(request.params.id)}})
  .then(response.send.bind(response), logger);
}

function deleteTodo(request, response, next) {
  TodosModel.destroy({where: {id: Number(request.params.id)}})
  .then(response.send.bind(response, 204), logger);
}

module.exports = express.Router()
  .get('/todos', getAllTodos)
  .get('/todos/:id', getTodosById)
  .post('/todos', createTodo)
  .put('/todos/:id', updateTodo)
  .delete('/todos/:id', deleteTodo);

