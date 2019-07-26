
import React from 'react';
import { use } from '@stated-library/react';
import Link from '../components/Link'
import { visLib } from '../state';

export default (props) => {
  const visibilityFilter = use(visLib.state$);
  const setFilter = React.useCallback(() => visLib.setFilter(props.filter), [props.filter]);
  return <Link
    active={visibilityFilter === props.filter}
    setFilter={setFilter}
  > {props.children}
  </Link>
}
