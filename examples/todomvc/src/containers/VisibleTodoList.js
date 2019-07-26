
import { connect } from '@stated-library/react';
import { mapState } from '@stated-library/core';

import { visibleTodos$, todoActions } from '../state';
import TodoList from '../components/TodoList'

const props$ = mapState(
  visibleTodos$,
  filteredTodos => ({
    filteredTodos,
    actions: todoActions,
  })
)

export default connect(props$)(TodoList);
