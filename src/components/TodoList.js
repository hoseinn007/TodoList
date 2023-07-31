import React, { useContext } from "react";
import { TodoContext } from "../todoContext/TodoProvider";
import { Todo } from "./Todo";

export const TodoList = () => {
  const [todosState] = useContext(TodoContext);
  const getVisibleTodos = () => {
    if (todosState.filter === "active") {
      return todosState.todos.filter((todo) => !todo.isCompleted);
    } else if (todosState.filter === "completed") {
      return todosState.todos.filter((todo) => todo.isCompleted);
    } else if (todosState.filter === "all") {
      return todosState.todos;
    }
    return todosState.todos;
  };
  const visibleTodos = getVisibleTodos();

  return (
    <>
      {visibleTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
