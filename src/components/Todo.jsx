import React, { useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : 'inherit',
              backgroundColor: todo.completed ? '#f8f9fa' : 'inherit',
            }}
            onClick={() => toggleTodo(index)}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.text}
            <button
              className="btn btn-danger custom-close-button"
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(index);
              }}
              style={{
                padding: '0.375rem 0.75rem',
                marginLeft: '8px',
                position: 'relative',
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
