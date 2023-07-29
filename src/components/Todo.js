import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ACTION } from "../helpers/Keycodes";
import { TodoContext } from "../todoContext/TodoProvider";

export const Todo = ({ todo }) => {
  const [editText, setEditText] = useState(todo.task);
  const [, dispatch] = useContext(TodoContext);
  // const setEditingTodo = () => {
  //   setEditingID(todo.id);
  // };
  const changeTodo = (e) => {
    e.preventDefault();
    console.log("task edited", editText);
    dispatch({
      type: ACTION.EDITED,
      payload: { id: todo.id, task: editText },
    });
    // setEditText("");

    // setEditingID(null);
  };
  const setCompleted = () => {
    dispatch({ type: ACTION.COMPLETED, payload: todo.id });
  };
  const setEditTodo = () => {
    dispatch({ type: ACTION.EDITING, payload: todo.id });
  };
  const setDeleteTodo = () => {
    dispatch({ type: ACTION.DELETED, payload: todo.id });
    console.log("deleted", todo.id);
  };
  return (
    <div>
      <div
        key={todo.id}
        className={`todo ${todo.isCompleted ? "completed-todo" : ""} 
        ${todo.isEditing ? "editing-todo" : ""} `}
      >
        <span
          className={`${todo.completed ? "completed" : ""}`}
          // onDoubleClick={setEditingTodo}
          onClick={setCompleted}
        >
          {todo.task}
        </span>
        <div>
          <FontAwesomeIcon icon={faTrash} onClick={setDeleteTodo} />
          <FontAwesomeIcon icon={faPenToSquare} onClick={setEditTodo} />
        </div>
      </div>
      {todo.isEditing && (
        <form className="todo-form todo-form-editing" onSubmit={changeTodo}>
          <input
            className=""
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit">Update Task</button>
        </form>
      )}
    </div>
  );
};
