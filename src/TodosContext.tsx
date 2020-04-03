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
  toggleTodo: Function;
}

export const TodosContext = createContext({} as TodosValue);

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState('');
  console.log('selectedTodo', selectedTodo);

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

  const toggleTodo = useCallback(
    (id: string) => {
      const newTodos = todos.map((todo: ITodo) => {
        if (todo.title === id) {
          const isCompleted = todo.complete;
          return {
            ...todo,
            complete: !isCompleted,
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
      toggleTodo,
      deleteTodo,
    };
  }, [todos, selectedTodo, addTodo, toggleTodo, deleteTodo]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
