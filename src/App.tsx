import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { AddItem } from './AddItem';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

const App = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div>
      {todos.map((todo: ITodo) => (
        <TodoItem name={todo.title} key={todo.title} />
      ))}
      <AddItem />
    </div>
  );
};

export default App;
