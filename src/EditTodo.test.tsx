import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('The EditTodo component', () => {
  const setupApp = () =>
    render(
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    );

  test('removes a deleted todo', () => {
    store.set('todos', mockTodos);
    const { getByText, getByRole } = setupApp();

    const todo = getByText(mockTodos[0].title);

    userEvent.click(todo);

    const deleteButton = getByRole('button', { name: /delete/i });

    userEvent.click(deleteButton);

    expect(todo).not.toBeInTheDocument();
  });
});
