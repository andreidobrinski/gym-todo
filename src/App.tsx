import React from 'react';
import { AddItem } from './AddItem';
import { TodoList } from './TodoList';

const App = () => {
  return (
    <div>
      <TodoList />
      <AddItem />
    </div>
  );
};

export default App;
