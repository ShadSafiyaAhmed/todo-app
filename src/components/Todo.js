import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    const trimmedTodo = todo.trim();

    if (trimmedTodo === "") {
      return; 
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? { id: to.id, list: trimmedTodo, status: editTodo.status } 
          : to
      );
      setTodos(updateTodo);
      setEditID(0);
      setTodo("");
    } else {
      if (todos.some((to) => to.list === trimmedTodo)) {
        alert("This todo already exists.");
        return;
      }

      setTodos([...todos, { list: trimmedTodo, id: Date.now(), status: false }]);
      setTodo("");
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => {
            return (
              <li className="list-items" key={to.id}>
                <div className="list-item-list" id={to.status ? "list-item" : ""}>
                  {to.list}
                </div>
                <span>
                  <IoMdDoneAll
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <FiEdit
                    className="list-item-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <MdDelete
                    className="list-item-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => onDelete(to.id)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
