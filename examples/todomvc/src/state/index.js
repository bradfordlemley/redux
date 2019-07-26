import memoize from 'memoize-one';
import TodosLib from './todos';
import VisLib from './visibility';
import { mapState, devTools } from '@stated-library/core';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

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

export const visibleTodos$ = mapState(
  [todosLib.state$, visLib.state$],
  ([todosState, visState]) => getVisibleTodos(visState, todosState)
)

// const getVisibilityFilter = state => state.visibilityFilter

// const getTodos = state => state.todos

// export const getCompletedTodoCount = createSelector(
//   [getTodos],
//   todos => (
//     todos.reduce((count, todo) =>
//       todo.completed ? count + 1 : count,
//       0
//     )
//   )
// )

const getCompletedTodoCount = memoize(
  todos => (
    todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
  )
)

export const completedTodoCount$ = mapState(
  todosLib.state$,
  todoState => getCompletedTodoCount(todoState)
);

export const todoActions = {
  clearCompleted: todosLib.clearCompleted,
  completeAllTodos: todosLib.completeAll,
  editTodo: todosLib.edit,
  deleteTodo: todosLib.delete,
  completeTodo: todosLib.complete,
}
