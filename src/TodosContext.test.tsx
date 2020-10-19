import React from 'react';
import { render } from '@testing-library/react';
import store from 'store';
import { App } from './App';
import { TodosContextProvider } from './TodosContext';

afterEach(() => {
  store.clearAll();
});

describe('The TodosContext component', () => {
  const setupApp = () =>
    render(
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    );

  test('renders a todo from local storage', () => {
    const mockTodos = [
      {
        title: 'test',
        complete: false,
        dateCompleted: null,
        repeatInterval: 7,
      },
    ];
    store.set('todos', mockTodos);
    const { getByText } = setupApp();

    expect(getByText(mockTodos[0].title)).toBeInTheDocument();
  });

  test('unchecks a completed todo after the repeat interval', () => {
    // create a date that is one day past the repeat interval
    const dateCompleted = new Date();
    dateCompleted.setDate(dateCompleted.getDate() - 8);

    const mockTodos = [
      {
        title: 'test',
        complete: true,
        dateCompleted,
        repeatInterval: 7,
      },
    ];

    store.set('todos', mockTodos);
    const { getByRole } = setupApp();

    expect(getByRole('checkbox')).not.toBeChecked();
  });
});
