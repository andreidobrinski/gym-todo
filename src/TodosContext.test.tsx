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
];

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
    store.set('todos', mockTodos);
    const { getByText } = setupApp();

    expect(getByText(mockTodos[0].title)).toBeInTheDocument();
  });
});
