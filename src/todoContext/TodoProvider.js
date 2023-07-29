import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTION } from "../helpers/Keycodes";
uuidv4();

const initialState = { todos: [], filter: "all" };

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      const newTodo = {
        id: uuidv4(),
        task: action.payload,
        isCompleted: false,
        isEditing: false,
      };
      return { ...state, todos: [...state.todos, newTodo], filter: "all" };
    case ACTION.EDITING: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
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
      return { ...state, todos: updatedTodos };
    }
    case ACTION.COMPLETED: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
    }
    case ACTION.DELETED: {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: updatedTodos };
    }
    case ACTION.CHANGE_FILTER: {
      return { ...state, filter: action.payload };
    }

    default:
      return state;
  }
};

export const TodoContext = createContext();
export const TodosProvider = ({ children }) => {
  const value = useReducer(todoReducer, initialState);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
