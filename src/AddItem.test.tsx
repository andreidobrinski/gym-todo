import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from 'store';
import { App } from './App';
import { TodosContextProvider } from './TodosContext';

afterEach(() => {
  store.clearAll();
});

describe('The AddItem component', () => {
  const setupApp = () =>
    render(
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    );

  test('renders a new todo', () => {
    const { getByText, getByLabelText, getByRole } = setupApp();

    userEvent.click(getByText(/add todo/i));

    userEvent.type(getByLabelText('add new todo'), 'test todo');

    userEvent.click(getByText(/add/i));

    expect(getByRole('listitem')).toBeInTheDocument();
    expect(getByText('test todo')).toBeInTheDocument();
  });
});
