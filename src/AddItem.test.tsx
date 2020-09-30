import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

    fireEvent.click(getByText(/add todo/i));

    fireEvent.change(getByLabelText('add new todo'), {
      target: { value: 'test todo' },
    });

    fireEvent.click(getByText(/add/i));

    expect(getByRole('listitem')).toBeInTheDocument();
    expect(getByText('test todo')).toBeInTheDocument();
  });
});
