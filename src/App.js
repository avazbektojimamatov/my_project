import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Do the dishes", check: false },
    { id: 2, task: "Take out the trash", check: false },
    { id: 3, task: "Mow the lawn", check: false }
  ]);

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if(event.target[0].value.split(" ").join("") === '') return;
    setTodos([...todos, { id: todos.length + 1, task: input }]);
    setInput("");
  };

  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdate = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, check: true } : todo
      )
    );
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="d-flex mb-4">
            <input
              type="text"
              className="form-control "
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder="Enter a task"
            />
            <button type="submit" className="btn btn-primary">
              AddList
            </button>
          </div>
          
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a task"
          />
        </div>
      </form>
      <ul className="list-group mt-5">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.check && 'bg-success text-white'}`}>
            {todo.task}
            <div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(todo.id)}
                className={`btn btn-success mx-3 ${todo.check && 'd-none'}`}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp