import React, { createContext, useMemo, useState, useEffect } from 'react';
import store from 'store';
import { ITodo } from './ITodo';

interface TodosContextProps {
  children: JSX.Element;
}

interface TodosValue {
  todos: ITodo[];
  setTodos: Function;
}

export const TodosContext = createContext({} as TodosValue);

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const storeTodos = store.get('todos');
    if (storeTodos) {
      setTodos(storeTodos);
    } else {
      store.set('todos', todos);
    }
    // eslint-disable-next-line
  }, []);

  const value: TodosValue = useMemo(() => {
    return {
      todos,
      setTodos,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
