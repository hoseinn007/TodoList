import React, { useContext, useState } from "react";
import { TodoContext } from "../todoContext/TodoProvider";
import { ACTION } from "../helpers/Keycodes";

export const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [, dispatch] = useContext(TodoContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimTodo = todo.trim();
    if (trimTodo.length > 0) {
      dispatch({ type: ACTION.ADD_TODO, payload: trimTodo });
    }
    setTodo("");
  };
  return (
    <div>
      <form className="todo-form" onSubmit={submitHandler}>
        <input
          className=""
          type="text"
          value={todo}
          placeholder="What is the task?"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};
