import { mapState } from '@stated-library/core';
import { connect } from '@stated-library/react';
import { completedTodoCount$, todosLib, todoActions } from '../state';

import MainSection from '../components/MainSection'

const props$ = mapState(
  [todosLib.state$, completedTodoCount$],
  ([todosState, completedCount]) => ({
    completedCount,
    todosCount: todosState.length,
    actions: todoActions,
  })
);

export default connect(props$)(MainSection);

