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
  moveTodoToTop: Function;
}

/**
 * Stores todos in local storage. Removes `todo.isToday` if exists.
 */
function saveTodos(todos: Array<ITodo>) {
  const formattedTodos = todos.map((todo) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { isToday, ...restOfTodo } = todo;
    return restOfTodo;
  });
  store.set('todos', formattedTodos);
}

export const TodosContext = createContext({} as ITodosContext);

export const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState('');

  // update local storage and state with todos on mount, sorted by completion
  useEffect(() => {
    const storeTodos = store.get('todos') || todos;
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
      saveTodos(newTodos);
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
      saveTodos(newTodos);
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
      saveTodos(newTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const newTodos = todos.filter((todo: ITodo) => todo.title !== id);
      setTodos(newTodos);
      saveTodos(newTodos);
    },
    [todos]
  );

  const moveTodoToTop = useCallback(
    (id: string) => {
      const topTodo = todos.find((todo: ITodo) => todo.title === id);
      const todosWithoutSelected = todos.filter(
        (todo: ITodo) => todo.title !== id
      );
      if (!topTodo) return todos;
      const newTodos = [{ ...topTodo, isToday: true }, ...todosWithoutSelected];
      setSelectedTodo('');
      setTodos(newTodos);
      saveTodos(newTodos);
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
      moveTodoToTop,
    };
  }, [
    todos,
    selectedTodo,
    addTodo,
    toggleTodo,
    setTodoRepeat,
    deleteTodo,
    moveTodoToTop,
  ]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
