import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

export const AddItem = () => {
  const { todos, addTodo } = useContext(TodosContext);
  const [value, setValue] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(false);

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
        <Button onClick={() => setAdding(true)}>Add Todo</Button>
      </Wrap>
    );

  return (
    <Wrap>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      {error ? (
        <div>Todo already exists</div>
      ) : (
        <Button
          onClick={() => {
            addTodo(value);
            setValue('');
            setAdding(false);
          }}
          disabled={value === ''}
        >
          Add
        </Button>
      )}
      <Button onClick={() => setAdding(false)}>Cancel</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-top: 16px;
`;

const Button = styled.button.attrs(() => ({
  type: 'button',
}))``;
