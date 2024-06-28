import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const TodoItem = ({
  item,
  index,
  handleDeleteTodo,
  handleEditClick,
  handleToggleComplete,
}) => {
  return (
    <div className="todo-list-item" key={index}>
      <div className="tdl">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div>
        <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} />
        <AiOutlineEdit className="icon" onClick={() => handleEditClick(index)} />
        <BsCheckLg
          className={`check-icon ${item.isCompleted && "active"}`}
          onClick={() => handleToggleComplete(index)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
