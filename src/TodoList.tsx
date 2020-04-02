import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { ITodo } from './ITodo';
import { TodosContext } from './TodosContext';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {todos.map((todo: ITodo) => (
        <TodoItem name={todo.title} key={todo.title} />
      ))}
    </div>
  );
};
