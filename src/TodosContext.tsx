import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import store from 'store';
import { ITodo } from './ITodo';
import { getDiffDays } from './helper';

interface TodosContextProps {
  children: JSX.Element;
}

interface ITodosContext {
  todos: ITodo[];
  setTodos: Function;
  selectedTodo: string;
  setSelectedTodo: Function;
  addTodo: Function;
  deleteTodo: Function;
  toggleTodo: Function;
  setTodoRepeat: Function;
}

export const TodosContext = createContext({} as ITodosContext);

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState('');

  // update local storage and state with todos on mount, sorted by completion
  useEffect(() => {
    const storeTodos = store.get('todos');
    if (!storeTodos) {
      return store.set('todos', todos);
    }
    const completedTodos = storeTodos.map((todo: ITodo) => {
      if (!todo.dateCompleted) return todo;
      const diffDays = getDiffDays(new Date(todo.dateCompleted).getTime());

      if (diffDays >= todo.repeatInterval)
        return {
          ...todo,
          dateCompleted: null,
          complete: false,
        };
      return todo;
    });
    const sortedByCompletion = [...completedTodos].sort(
      (a: ITodo, b: ITodo) => {
        if (a.complete === b.complete) return 0;
        return a.complete ? 1 : -1;
      }
    );
    store.set('todos', sortedByCompletion);
    return setTodos(sortedByCompletion);
    // eslint-disable-next-line
  }, []);

  const addTodo = useCallback(
    (id: string) => {
      const newTodos = [
        ...todos,
        { title: id, complete: false, dateCompleted: null, repeatInterval: 7 },
      ];
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
            dateCompleted: isCompleted ? null : new Date(),
          };
        }
        return todo;
      });
      setTodos(newTodos);
      store.set('todos', newTodos);
    },
    [todos]
  );

  const setTodoRepeat = useCallback(
    (id: string, days: number) => {
      const newTodos = todos.map((todo: ITodo) => {
        if (todo.title === id) {
          return {
            ...todo,
            repeatInterval: days,
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

  const value: ITodosContext = useMemo(() => {
    return {
      todos,
      setTodos,
      selectedTodo,
      setSelectedTodo,
      addTodo,
      toggleTodo,
      setTodoRepeat,
      deleteTodo,
    };
  }, [todos, selectedTodo, addTodo, toggleTodo, setTodoRepeat, deleteTodo]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
