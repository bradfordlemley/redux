/*
This file contains the entirity global application state and logic.
** components get global state from observables exported from this file.
** components invoke global functionality via functions exported from this file.
*/

import memoize from 'memoize-one';
import { mapState, devTools } from '@stated-library/core';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import TodosLib from './todos';
import VisLib from './visibility';

export const todosLib = TodosLib();
export const visLib = VisLib();

devTools.connect(todosLib, 'todoLib');
devTools.connect(visLib, 'visLib');

const getVisibleTodos = memoize(
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export const todos$ = todosLib.state$;
export const visibilityFilter$ = visLib.state$;

export const visibleTodos$ = mapState(
  [todos$, visibilityFilter$],
  ([todos, visibilityFilter]) => getVisibleTodos(visibilityFilter, todos)
)

const getCompletedTodoCount = memoize(
  todos => (
    todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
  )
)

export const completedTodoCount$ = mapState(
  todos$,
  todos => getCompletedTodoCount(todos)
);

export const actions = {
  addTodo: todosLib.add,
  clearCompleted: todosLib.clearCompleted,
  completeAllTodos: todosLib.completeAll,
  editTodo: todosLib.edit,
  deleteTodo: todosLib.delete,
  completeTodo: todosLib.complete,
}
