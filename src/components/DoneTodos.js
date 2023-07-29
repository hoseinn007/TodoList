import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DoneTodos = ({ task }) => {
  return (
    <div className={`todo ${task.completed ? "completed-todo" : ""}`}>
      <span
        // onClick={() => targetComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </span>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          //   onClick={() => todoEditing(task.id)}
        />
        {task.completed ? (
          ""
        ) : (
          <FontAwesomeIcon
            icon={faTrash}
            // onClick={() => (!task.completed ? todoTrash(task.id) : "")}
          />
        )}
      </div>
    </div>
  );
};
