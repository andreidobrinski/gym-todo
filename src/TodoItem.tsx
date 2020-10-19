import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { EditTodo } from './EditTodo';
import { CheckmarkIcon } from './assets/CheckmarkIcon';

interface TodoItemProps {
  id: string;
}

// TODO: change CheckButton to be an accessible
export const TodoItem = ({ id }: TodoItemProps) => {
  const { todos, selectedTodo, setSelectedTodo, toggleTodo } = useContext(
    TodosContext
  );

  const todo = todos.find((item: ITodo) => item.title === id);

  if (!todo) return null;

  const isSelected = id === selectedTodo;
  const isComplete = todo.complete;

  return (
    <Wrap animate={{ y: 0, opacity: 1 }} initial={{ y: 16, opacity: 0 }}>
      <CheckButton
        onClick={() => toggleTodo(id)}
        aria-label={`checkbox for ${id}`}
        aria-checked={isComplete}
        role="checkbox"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
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
      <AnimatePresence>
        {isSelected && <EditTodo todo={todo} />}
      </AnimatePresence>
    </Wrap>
  );
};

const Wrap = styled(motion.li)`
  margin: 4px 0;
  display: grid;
  grid-template-columns: 37px 1fr;
  align-items: center;
`;

const CheckButton = styled(motion.button).attrs(() => ({
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
