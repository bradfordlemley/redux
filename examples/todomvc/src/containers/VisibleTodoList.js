
import { connect } from '@stated-library/react';
import { mapState } from '@stated-library/core';

import { visibleTodos$, actions } from '../state';
import TodoList from '../components/TodoList'

const props$ = mapState(
  visibleTodos$,
  filteredTodos => ({
    filteredTodos,
    actions,
  })
)

export default connect(props$)(TodoList);
