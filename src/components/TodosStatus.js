import React, { useContext } from "react";
import { TodoContext } from "../todoContext/TodoProvider";
import { ACTION } from "../helpers/Keycodes";

export const TodosStatus = () => {
  const [todosState, dispatch] = useContext(TodoContext);
  const activeCount = todosState.todos.filter(
    (todo) => !todo.isCompleted
  ).length;
  const activeTask = `Active task${activeCount !== 1 ? "s" : ""}: `;
  const getSelectedClass = (filterName) => {
    return todosState.filter === filterName ? "selected" : "";
  };

  const changeFilter = (event, filterName) => {
    event.preventDefault();
    dispatch({ type: ACTION.CHANGE_FILTER, payload: filterName });
  };
  return (
    <div
      className={`todo-status ${
        todosState.todos.length === 0 ? "todo-status-hidden" : ""
      }`}
    >
      <div className="todo-status-filter">
        <a
          href=".."
          className={getSelectedClass("all")}
          onClick={(event) => changeFilter(event, "all")}
        >
          All
        </a>
        <a
          href="./"
          className={getSelectedClass("active")}
          onClick={(event) => changeFilter(event, "active")}
        >
          Active
        </a>
        <a
          href="/"
          className={getSelectedClass("completed")}
          onClick={(event) => changeFilter(event, "completed")}
        >
          Completed
        </a>
      </div>

      <span className="todo-status-count">
        {activeTask}
        {activeCount}
      </span>
    </div>
  );
};
