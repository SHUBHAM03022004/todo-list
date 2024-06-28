import React, { useEffect, useState } from "react";
import "./App.css";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const isDuplicateTitle = (title) => {
    const lowerCaseTitle = title.toLowerCase();
    return allTodos.some(
      (todo, index) =>
        todo.title.toLowerCase() === lowerCaseTitle && index !== currentTodoIndex
    );
  };
  

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title or description cannot be empty.");
      return;
    }

    if (isDuplicateTitle(newTitle)) {
      alert("Title must be unique.");
      return;
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      isCompleted: false,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleEditTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title or description cannot be empty.");
      return;
    }

    if (isDuplicateTitle(newTitle)) {
      alert("Title must be unique.");
      return;
    }

    const updatedTodoArr = allTodos.map((todo, index) => {
      if (index === currentTodoIndex) {
        return { ...todo, title: newTitle, description: newDescription };
      }
      return todo;
    });

    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
    setIsEditing(false);
    setCurrentTodoIndex(null);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  const handleDeleteTodo = (index) => {
    const updatedTodoArr = allTodos.filter((_, i) => i !== index);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleToggleComplete = (index) => {
    const updatedTodoArr = allTodos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  return (
    <>
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <TodoInput
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          handleAddTodo={handleAddTodo}
          handleEditTodo={handleEditTodo}
          isEditing={isEditing}
        />
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <TodoList
          allTodos={allTodos}
          isCompleteScreen={isCompleteScreen}
          handleDeleteTodo={handleDeleteTodo}
          handleEditClick={handleEditClick}
          handleToggleComplete={handleToggleComplete}
        />
      </div>
    </>
  );
}

export default App;
