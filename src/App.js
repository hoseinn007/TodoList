import "./App.css";

import { TodoWrapper } from "./components/TodoWrapper";
import { TodosProvider } from "./todoContext/TodoProvider";

function App() {
  return (
    <TodosProvider>
      <TodoWrapper />
    </TodosProvider>
  );
}

export default App;
