import { createStatedLib } from '@stated-library/base';

import { SHOW_ALL } from '../constants/TodoFilters'

export default (initialFilter = SHOW_ALL) => createStatedLib(
  initialFilter,
  base => ({
    setFilter(filter) {
      base.setState(filter, 'SET_FILTER')
    }
  })
);
