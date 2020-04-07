import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { EditTodo } from './EditTodo';
import { CheckmarkIcon } from './assets/CheckmarkIcon';

interface TodoItemProps {
  id: string;
}

export const TodoItem = ({ id }: TodoItemProps) => {
  const { todos, selectedTodo, setSelectedTodo, toggleTodo } = useContext(
    TodosContext
  );

  const todo = todos.find((item: ITodo) => item.title === id);

  if (!todo) return null;

  const isSelected = id === selectedTodo;
  const isComplete = todo.complete;

  return (
    <Wrap>
      <CheckButton
        onClick={() => toggleTodo(id)}
        aria-label={`checkbox for ${id}`}
        aria-pressed={isComplete}
      >
        {isComplete && <CheckmarkIcon />}
      </CheckButton>
      <TodoButton
        onClick={() => (isSelected ? setSelectedTodo('') : setSelectedTodo(id))}
        isComplete={isComplete}
        aria-label={`${id} ${isComplete ? 'complete' : 'incomplete'}`}
        aria-pressed={isSelected}
      >
        {todo.title}
      </TodoButton>
      {isSelected && <EditTodo todo={todo} />}
    </Wrap>
  );
};

const Wrap = styled.li`
  margin: 4px 0;
  display: grid;
  grid-template-columns: 37px 1fr;
  align-items: center;
`;

const CheckButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  border-radius: 50%;
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ITodoButton {
  isComplete: boolean;
}

const TodoButton = styled.button.attrs(({ isComplete }: ITodoButton) => ({
  type: 'button',
  isComplete,
}))`
  background-color: transparent;
  text-decoration: ${(props) => props.isComplete && 'line-through'};
  text-align: left;
`;
