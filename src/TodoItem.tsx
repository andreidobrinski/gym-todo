import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { EditTodo } from './EditTodo';

interface TodoItemProps {
  id: string;
}

export const TodoItem = ({ id }: TodoItemProps) => {
  const { todos, selectedTodo, setSelectedTodo } = useContext(TodosContext);

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
        <EditTodo todo={todo} onClose={() => setSelectedTodo('')} />
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
  border: none;
  text-decoration: ${(props) => props.isComplete && 'line-through'};
`;
