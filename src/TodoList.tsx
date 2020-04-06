import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';
import { ITodo } from './ITodo';
import { TodosContext } from './TodosContext';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);

  return (
    <List>
      {todos.map((todo: ITodo) => (
        <TodoItem id={todo.title} key={todo.title} />
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;
