import { createStatedLib } from '@stated-library/base';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default (initialTodos) => createStatedLib(
  initialTodos || initialState,
  base => ({

    add(text) {
      base.setState(base.state.concat({
          id: base.state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text
        }),
        'ADD'
      );
    },

    delete(id) {
      base.setState(
        base.state.filter(todo => todo.id !== id),
        'DELETE'
      );
    },

    edit(id, text) {
      base.setState(
        base.state.map(todo =>
            todo.id === id ? { ...todo, text } : todo
        ),
        'EDIT'
      );
    },

    complete(id) {
      base.setState(
        base.state.map(todo =>
          todo.id === id ?
            { ...todo, completed: !todo.completed } :
            todo
        ),
        'COMPLETE'
      );
    },

    completeAll() {
      const areAllMarked = base.state.every(todo => todo.completed)
      base.setState(
        base.state.map(todo => ({
          ...todo,
          completed: !areAllMarked
        })),
        'COMPLETE_ALL'
      );
    },

    clearCompleted() {
      base.setState(
        base.state.filter(todo => todo.completed === false),
        'CLEAR_COMPLETED'
      );
    }
  })
);
