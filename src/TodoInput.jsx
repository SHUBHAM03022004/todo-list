import React from "react";

const TodoInput = ({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  handleAddTodo,
  handleEditTodo,
  isEditing,
}) => {
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title:</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What's the title?"
        />
      </div>
      <div className="todo-input-item">
        <label>Description:</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What's the description?"
        />
      </div>
      <div className="todo-input-item">
        {isEditing ? (
          <button type="button" onClick={handleEditTodo} className="primaryBtn">
            Save
          </button>
        ) : (
          <button type="button" onClick={handleAddTodo} className="primaryBtn">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoInput;
