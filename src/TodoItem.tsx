import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

interface TodoItemProps {
  id: string;
}

export const TodoItem = ({ id }: TodoItemProps) => {
  const {
    todos,
    selectedTodo,
    setSelectedTodo,
    deleteTodo,
    toggleTodo,
  } = useContext(TodosContext);

  const todo = todos.find((item: ITodo) => item.title === id);

  if (!todo) return null;

  const isSelected = id === selectedTodo;
  const isComplete = todo.complete;

  return (
    <div>
      <TodoButton
        onClick={() => (isSelected ? setSelectedTodo('') : setSelectedTodo(id))}
        isComplete={isComplete}
      >
        {todo.title}
      </TodoButton>
      {isSelected && (
        <>
          <button onClick={() => toggleTodo(id)} type="button">
            {isComplete ? 'uncheck' : 'check'}
          </button>
          <button onClick={() => deleteTodo(id)} type="button">
            remove
          </button>
        </>
      )}
    </div>
  );
};

interface ITodoButton {
  isComplete: boolean;
}

const TodoButton = styled.button.attrs(({ isComplete }: ITodoButton) => ({
  type: 'button',
  isComplete,
}))`
  text-decoration: ${(props) => props.isComplete && 'line-through'};
`;
