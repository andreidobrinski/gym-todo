import React, { createContext, useMemo, useState } from 'react';
import { ITodo } from './ITodo';

interface TodosContextProps {
  children: JSX.Element;
}

interface TodosValue {
  todos: ITodo[];
  setTodos: Function;
}

export const TodosContext = createContext({} as TodosValue);

const initialTodo = { title: 'hello', complete: false };

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([initialTodo]);

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
