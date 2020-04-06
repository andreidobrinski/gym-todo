import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';
import { TrashIcon } from './assets/TrashIcon';

interface EditTodoProps {
  todo: ITodo;
  onClose: Function;
}

export const EditTodo = ({ todo, onClose }: EditTodoProps) => {
  const { deleteTodo } = useContext(TodosContext);

  return (
    <Wrap>
      <button onClick={() => deleteTodo(todo.title)} type="button">
        <TrashIcon />
      </button>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-left: 8px;
  button {
    width: 45px;
  }
`;
