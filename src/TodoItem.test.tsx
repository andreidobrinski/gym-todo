import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from 'store';
import { App } from './App';
import { TodosContextProvider } from './TodosContext';

afterEach(() => {
  store.clearAll();
});

describe('The TodoItem component', () => {
  const setupApp = () =>
    render(
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    );

  test('toggles checked when clicked', () => {
    const mockTodos = [
      {
        title: 'test',
        complete: false,
        dateCompleted: null,
        repeatInterval: 7,
      },
    ];
    store.set('todos', mockTodos);
    const { getByRole } = setupApp();

    const checkbox = getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('renders checked todo on mount', () => {
    const mockTodos = [
      {
        title: 'test',
        complete: true,
        dateCompleted: new Date(),
        repeatInterval: 7,
      },
    ];
    store.set('todos', mockTodos);
    const { getByRole, getByText } = setupApp();

    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeChecked();

    expect(getByText(mockTodos[0].title)).toHaveStyle(
      'text-decoration: line-through'
    );
  });
});
