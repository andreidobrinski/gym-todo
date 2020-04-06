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
      <CheckButton onClick={() => toggleTodo(id)}>
        {isComplete && <CheckmarkIcon />}
      </CheckButton>
      <TodoButton
        onClick={() => (isSelected ? setSelectedTodo('') : setSelectedTodo(id))}
        isComplete={isComplete}
      >
        {todo.title}
      </TodoButton>
      {isSelected && (
        <EditTodo todo={todo} onClose={() => setSelectedTodo('')} />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const CheckButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  border-radius: 50%;
  margin-right: 2px;
  width: 36px;
  height: 36px;
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
`;
