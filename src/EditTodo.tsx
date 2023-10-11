import React, { useContext, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { TrashIcon } from './assets/TrashIcon';
import { ArrowUpIcon } from './assets/ArrowUpIcon';
import { getDiffDays } from './helper';

interface EditTodoProps {
  todo: ITodo;
}

export const EditTodo = ({ todo }: EditTodoProps) => {
  const { deleteTodo, setTodoRepeat, moveTodoToTop } = useContext(TodosContext);
  const [repeatDays, setRepeatDays] = useState(todo.repeatInterval);

  // set todo repeat interval if changed
  useEffect(() => {
    if (repeatDays !== todo.repeatInterval) {
      setTodoRepeat(todo.title, repeatDays);
    }
  });

  const getDaysUntilReset = useCallback(() => {
    if (!todo.dateCompleted) return null;
    const daysCompleted = getDiffDays(new Date(todo.dateCompleted).getTime());
    const diffDays = todo.repeatInterval - daysCompleted;
    return <p>Resets in {diffDays} days</p>;
  }, [todo.dateCompleted, todo.repeatInterval]);

  return (
    <Wrap
      key="edit-todo"
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -16, opacity: 0 }}
      exit={{ y: -8, opacity: 0 }}
    >
      <button
        onClick={() => moveTodoToTop(todo.title)}
        type="button"
        aria-label={`move ${todo.title} to top`}
        style={{ marginRight: '4px' }}
      >
        <ArrowUpIcon />
      </button>
      {!todo.dateCompleted && (
        <p>
          Repeats every
          <Input
            type="tel"
            min="1"
            step="1"
            value={repeatDays}
            onChange={(e) => setRepeatDays(Number(e.target.value))}
          />
          day{repeatDays === 1 ? '' : 's'}
        </p>
      )}
      <button
        onClick={() => deleteTodo(todo.title)}
        type="button"
        aria-label={`delete ${todo.title}`}
      >
        <TrashIcon />
      </button>
      {getDaysUntilReset()}
    </Wrap>
  );
};

const Wrap = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 8px;
  grid-column: 2;
  svg {
    margin-bottom: 2px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  p {
    color: rgba(0, 0, 0, 0.75);
    font-size: 16px;
    margin: 0 8px;
  }
`;

const Input = styled.input`
  width: 40px;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  padding: 4px;
  border-radius: 8px;
`;
