import React, { useContext } from 'react';
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
    completeTodo,
  } = useContext(TodosContext);

  const todo = todos.find((item: ITodo) => item.title === id);
  const isSelected = id === selectedTodo;

  if (!todo) return null;

  return (
    <div>
      <button onClick={() => setSelectedTodo(id)} type="button">
        {todo.title}
      </button>
      {isSelected && (
        <>
          <button onClick={() => completeTodo(id)} type="button">
            complete
          </button>
          <button onClick={() => deleteTodo(id)} type="button">
            remove
          </button>
        </>
      )}
    </div>
  );
};
