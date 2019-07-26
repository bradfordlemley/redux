import React from 'react';
import Header from '../components/Header'
import { todosLib } from '../state'

export default () => <Header addTodo={todosLib.add} />
