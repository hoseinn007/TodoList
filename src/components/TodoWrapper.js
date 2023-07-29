import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodosStatus } from "./TodosStatus";

export const TodoWrapper = () => {
  return (
    <div className="todo-wrapper">
      <h1>Todo List</h1>
      <TodoForm />
      <TodosStatus />
      <TodoList />
    </div>
  );
};
