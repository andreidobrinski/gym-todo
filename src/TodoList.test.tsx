import React from 'react';
import { render } from '@testing-library/react';
import store from 'store';
import { App } from './App';
import { TodosContextProvider } from './TodosContext';

const mockTodos = [
  {
    title: 'test',
    complete: false,
    dateCompleted: null,
    repeatInterval: 7,
  },
  {
    title: 'test2',
    complete: false,
    dateCompleted: null,
    repeatInterval: 7,
  },
  {
    title: 'test3',
    complete: false,
    dateCompleted: null,
    repeatInterval: 7,
  },
];

afterEach(() => {
  store.clearAll();
});

describe('The TodoList component', () => {
  const setupApp = () =>
    render(
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    );

  test('renders the correct number of todos', () => {
    store.set('todos', mockTodos);
    const { getAllByRole } = setupApp();

    expect(getAllByRole('listitem')).toHaveLength(mockTodos.length);
  });
});
