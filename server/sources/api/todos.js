'use strict'

var express = require('express');
var TodosModel = require('../models').Todos;

function getAllTodos(request, response, next) {
  console.log('all');
  console.log(TodosModel);
  response.send('Ok');
}

function getTodosById(request, response, next) {
  console.log('specific');
}

function createTodo(request, response, next) {
  console.log('create');
}

function updateTodo(request, response, next) {
  console.log('update');
}

function deleteTodo(request, response, next) {
  console.log('delete');
}

module.exports = express.Router()
  .get('/todos', getAllTodos)
  .get('/todos/:id', getTodosById)
  .post('/todos', createTodo)
  .put('/todos/:id', updateTodo)
  .delete('/todos/:id', deleteTodo);

