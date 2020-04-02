import React, { useState, useContext, useEffect } from 'react';
import store from 'store';
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
      <button type="button" onClick={() => setAdding(true)}>
        Add Todo
      </button>
    );

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      {error ? (
        <div>todo already exists</div>
      ) : (
        <button
          type="button"
          onClick={() => {
            addTodo(value);
            setValue('');
            setAdding(false);
          }}
        >
          Add
        </button>
      )}
    </>
  );
};
