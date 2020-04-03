import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

interface EditTodoProps {
  todo: ITodo;
  onClose: Function;
}

export const EditTodo = ({ todo, onClose }: EditTodoProps) => {
  const { toggleTodo, deleteTodo } = useContext(TodosContext);

  return (
    <div>
      <button
        onClick={() => {
          toggleTodo(todo.title);
          onClose();
        }}
        type="button"
      >
        {todo.complete ? 'uncheck' : 'check'}
      </button>
      <button onClick={() => deleteTodo(todo.title)} type="button">
        remove
      </button>
    </div>
  );
};
