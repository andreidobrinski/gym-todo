import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';
import { ITodo } from './ITodo';
import { TodosContext } from './TodosContext';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);

  return (
    <List>
      {todos.map((todo: ITodo, index) => {
        const isLastTodoToday = todo.isToday && !todos[index + 1]?.isToday;
        return (
          <Fragment key={todo.title}>
            <TodoItem id={todo.title} />
            {isLastTodoToday && <Separator />}
          </Fragment>
        );
      })}
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

const Separator = styled.hr`
  height: 2px;
  width: 100%;
  background: lightgray;
  border: none;
`;
