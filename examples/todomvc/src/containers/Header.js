import React from 'react';
import Header from '../components/Header'
import { actions } from '../state'

export default () => <Header addTodo={actions.addTodo} />
