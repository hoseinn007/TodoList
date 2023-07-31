import { createContext, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTION } from "../helpers/Keycodes";
uuidv4();
export const TodoContext = createContext();
const initialState = { todos: [], filter: "all" };

const getInitialState = () => {
  const isThereTodos = localStorage.getItem("Todos");
  const lastTodos = JSON.parse(isThereTodos);
  return isThereTodos ? lastTodos : initialState;
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      const newTask = {
        id: uuidv4(),
        task: action.payload,
        isCompleted: false,
        isEditing: false,
      };
      const newTodo = {
        ...state,
        todos: [...state.todos, newTask],
        filter: "all",
      };
      localStorage.setItem("Todos", JSON.stringify(newTodo));

      return newTodo;
    case ACTION.EDITING: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
      const newTodo = { ...state, todos: updatedTodos };
      localStorage.setItem("Todos", JSON.stringify(newTodo));
      return newTodo;
    }
    case ACTION.EDITED: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            task: action.payload.task,
            isEditing: !todo.isEditing,
          };
        }
        return todo;
      });
      const newTodo = { ...state, todos: updatedTodos };
      localStorage.setItem("Todos", JSON.stringify(newTodo));

      return newTodo;
    }
    case ACTION.COMPLETED: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      const newTodo = { ...state, todos: updatedTodos };
      localStorage.setItem("Todos", JSON.stringify(newTodo));
      return newTodo;
    }
    case ACTION.DELETED: {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      const newTodo = { ...state, todos: updatedTodos };
      localStorage.setItem("Todos", JSON.stringify(newTodo));

      return newTodo;
    }
    case ACTION.CHANGE_FILTER: {
      const newTodo = { ...state, filter: action.payload };
      localStorage.setItem("Todos", JSON.stringify(newTodo));
      return newTodo;
    }

    default:
      return state;
  }
};

export const TodosProvider = ({ children }) => {
  const [initialUseState] = useState(getInitialState);
  const value = useReducer(todoReducer, initialUseState);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
