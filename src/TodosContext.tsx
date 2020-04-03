import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import store from 'store';
import { ITodo } from './ITodo';

interface TodosContextProps {
  children: JSX.Element;
}

interface TodosValue {
  todos: ITodo[];
  setTodos: Function;
  selectedTodo: string;
  setSelectedTodo: Function;
  addTodo: Function;
  deleteTodo: Function;
  completeTodo: Function;
}

export const TodosContext = createContext({} as TodosValue);

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState('');

  useEffect(() => {
    const storeTodos = store.get('todos');
    if (storeTodos) {
      setTodos(storeTodos);
    } else {
      store.set('todos', todos);
    }
    // eslint-disable-next-line
  }, []);

  const addTodo = useCallback(
    (id: string) => {
      const newTodos = [...todos, { title: id, complete: false }];
      setTodos(newTodos);
      store.set('todos', newTodos);
    },
    [todos]
  );

  const completeTodo = useCallback(
    (id: string) => {
      const newTodos = todos.map((todo: ITodo) => {
        if (todo.title === id) {
          return {
            ...todo,
            complete: true,
          };
        }
        return todo;
      });
      setTodos(newTodos);
      store.set('todos', newTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const newTodos = todos.filter((todo: ITodo) => todo.title !== id);
      setTodos(newTodos);
      store.set('todos', newTodos);
    },
    [todos]
  );

  const value: TodosValue = useMemo(() => {
    return {
      todos,
      setTodos,
      selectedTodo,
      setSelectedTodo,
      addTodo,
      completeTodo,
      deleteTodo,
    };
  }, [todos, selectedTodo, addTodo, completeTodo, deleteTodo]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
