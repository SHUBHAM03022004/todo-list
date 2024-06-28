import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  allTodos,
  isCompleteScreen,
  handleDeleteTodo,
  handleEditClick,
  handleToggleComplete,
}) => {
  return (
    <div className="todo-list">
      {allTodos
        .filter((item) => item.isCompleted === isCompleteScreen)
        .map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            handleDeleteTodo={handleDeleteTodo}
            handleEditClick={handleEditClick}
            handleToggleComplete={handleToggleComplete}
          />
        ))}
    </div>
  );
};

export default TodoList;
