import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { TrashIcon } from './assets/TrashIcon';
import { getDiffDays } from './helper';

interface EditTodoProps {
  todo: ITodo;
}

export const EditTodo = ({ todo }: EditTodoProps) => {
  const { deleteTodo } = useContext(TodosContext);

  const getDaysUntilReset = useCallback(() => {
    if (!todo.dateCompleted) return null;
    const daysUntilReset = 7;
    const daysCompleted = getDiffDays(new Date(todo.dateCompleted).getTime());
    const diffDays = daysUntilReset - daysCompleted;
    return <p>Resets in {diffDays} days</p>;
  }, [todo.dateCompleted]);

  return (
    <Wrap>
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

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  button {
    width: 45px;
  }
  p {
    color: rgba(0, 0, 0, 0.75);
    font-size: 16px;
    margin: 0 8px;
  }
`;
