import React, { useState, useMemo, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const initializeTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  };

  useEffect(() => {
    initializeTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (input.trim() === "") return;
    const newTodo = { id: todos.length + 1, task: input, check: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInput("");
  };

  const handleDelete = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleUpdate = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, check: true } : todo
      )
    );
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div className="container mt-5 col-md-8 col-lg-6">
      <h1 className="text-center mb-5">To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="d-flex mb-4">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={event => handleChange(event, setInput)}
              placeholder="Enter a task"
            />
            <button type="submit" className="btn btn-primary ml-2">
              <i className="bi bi-plus-circle-dotted"></i>
            </button>
          </div>

          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={event => handleChange(event, setSearchTerm)}
            placeholder="Search for a task"
          />
        </div>
      </form>
      <ul className="list-group mt-5">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.check ? "bg-success text-white" : ""
            }`}
          >
            <span>{todo.task}</span>
            <div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="btn btn-danger"
              >
                <i className="bi bi-trash3-fill"></i>
              </button>

              {!todo.check && (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="btn btn-success ml-2"
                >
                  <i className="bi bi-check2-circle"></i>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
