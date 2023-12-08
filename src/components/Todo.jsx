import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = async () => {
    if (task.trim() !== "") {
      setTodos([...todos, { text: task, completed: false }]);
      setTask("");
    }
  };

  const fetchCatImage = async (index) => {
    try {
      const response = await fetch("https://cataas.com/cat");
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const newTodos = [...todos];
      newTodos[index].catImage = imageUrl;
      setTodos(newTodos);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }
  };

  const toggleTodo = async (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);

    await fetchCatImage(index);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const openModal = async (index) => {
    const currentTodo = todos[index];

    // Check if the cat image is already fetched
    if (!currentTodo.catImage) {
      await fetchCatImage(index);
    }

    setSelectedTodo(currentTodo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#888" : "inherit",
              backgroundColor: todo.completed ? "#f8f9fa" : "inherit",
            }}
            onClick={() => toggleTodo(index)}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.text}
            <div>
              <button
                className="btn btn-info mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(index);
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <button
                className="btn btn-danger custom-close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTodo(index);
                }}
                style={{
                  padding: "0.375rem 0.75rem",
                  marginLeft: "8px",
                  position: "relative",
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Modal show={!!selectedTodo} onHide={closeModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTodo && selectedTodo.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTodo && (
            <>
              <img
                src={selectedTodo.catImage}
                alt="Cat"
                style={{ maxWidth: "100%" }}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todo;
