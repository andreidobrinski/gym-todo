import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

export const AddItem = () => {
  const { todos, addTodo, selectedTodo, setSelectedTodo } = useContext(
    TodosContext
  );
  const [value, setValue] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(false);

  // set adding state to false if a todo is selected
  useEffect(() => {
    if (selectedTodo) {
      setAdding(false);
    }
  }, [selectedTodo]);

  // set error true if new todo matches existing todo
  useEffect(() => {
    const duplicateTodo = todos.find((todo: ITodo) => todo.title === value);
    if (duplicateTodo) {
      setError(true);
    }
    if (error && !duplicateTodo) {
      setError(false);
    }
  }, [error, value, todos]);

  if (!adding)
    return (
      <Wrap>
        <Button
          onClick={() => {
            setAdding(true);
            setSelectedTodo('');
          }}
        >
          Add Todo
        </Button>
      </Wrap>
    );

  return (
    <Wrap>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        aria-label="add new todo"
      />
      {error ? (
        <div>Todo already exists</div>
      ) : (
        <Button
          onClick={() => {
            addTodo(value);
            setValue('');
          }}
          disabled={value === ''}
        >
          Add
        </Button>
      )}
      <Button onClick={() => setAdding(false)} cancel>
        Cancel
      </Button>
    </Wrap>
  );
};

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-top: 16px;
  input {
    font-size: 18px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--bg);
  }
`;

interface IButton {
  cancel: boolean;
}

const Button = styled.button.attrs(({ cancel }: IButton) => ({
  type: 'button',
  cancel,
}))`
  padding: 8px 16px;
  margin-top: 8px;
  ${(props) =>
    props.cancel &&
    `
      margin-top: 4px;
      background-color: transparent;
  `};
`;
