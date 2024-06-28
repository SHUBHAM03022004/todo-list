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

  // Function to check if a title is already used (case insensitive)
  const isDuplicateTitle = (title) => {
    const lowerCaseTitle = title.toLowerCase();
    return allTodos.some(
      (todo, index) =>
        todo.title.toLowerCase() === lowerCaseTitle && index !== currentTodoIndex
    );
  };
  
  // Function to handle adding a new todo
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

    // Update state with new todo item
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    // Update local storage with new todos
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    // Clear input fields after adding todo
    setNewTitle("");
    setNewDescription("");
  };

  // Function to handle editing an existing todo
  const handleEditTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title or description cannot be empty.");
      return;
    }

    if (isDuplicateTitle(newTitle)) {
      alert("Title must be unique.");
      return;
    }

    // Map through current todos to update the edited todo
    const updatedTodoArr = allTodos.map((todo, index) => {
      if (index === currentTodoIndex) {
        return { ...todo, title: newTitle, description: newDescription };
      }
      return todo;
    });

    // Update state with edited todos
    setTodos(updatedTodoArr);
    // Update local storage with edited todos
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    // Clear input fields and reset editing state
    setNewTitle("");
    setNewDescription("");
    setIsEditing(false);
    setCurrentTodoIndex(null);
  };

  // Load todos from local storage on component mount
  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

   // Function to handle deleting a todo
  const handleDeleteTodo = (index) => {
     // Filter out the todo to be deleted based on index
    const updatedTodoArr = allTodos.filter((_, i) => i !== index);
    setTodos(updatedTodoArr);
    // Update local storage after deletion
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  // Function to handle toggling todo completion status
  const handleToggleComplete = (index) => {
    // Map through todos to toggle completion status of the selected todo
    const updatedTodoArr = allTodos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    // Update state with toggled todos
    setTodos(updatedTodoArr);
    // Update local storage with toggled todos
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  // Function to handle clicking edit button on a todo
  const handleEditClick = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setNewTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  // Render the application UI
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
