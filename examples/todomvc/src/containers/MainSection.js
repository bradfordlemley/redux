import { mapState } from '@stated-library/core';
import { connect } from '@stated-library/react';
import { completedTodoCount$, todos$, actions } from '../state';

import MainSection from '../components/MainSection'

const props$ = mapState(
  [todos$, completedTodoCount$],
  ([todos, completedCount]) => ({
    completedCount,
    todosCount: todos.length,
    actions,
  })
);

export default connect(props$)(MainSection);

