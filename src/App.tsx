import React, { useContext, useEffect } from 'react';
import store from 'store';
import { TodoItem } from './TodoItem';
import { AddItem } from './AddItem';
import { TodosContext } from './TodosContext';
import { ITodo } from './ITodo';

const App = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    const storeTodos = store.get('todos');
    if (storeTodos) {
      setTodos(storeTodos);
    } else {
      store.set('todos', todos);
    }
    // eslint-disable-next-line
  }, []);

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
