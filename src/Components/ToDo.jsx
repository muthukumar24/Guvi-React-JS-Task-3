import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    }));
  };

  const handleCreateTodo = () => {
    if (taskName.trim() !== '' && description.trim() !== '') {
      const newTodo = {
        id: Math.floor(Math.random() * 1001),
        taskName,
        description,
        status,
      };
      setTodos([...todos, newTodo]);
      setTaskName('');
      setDescription('');
      setStatus('not completed');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setTaskName(todoToEdit.taskName);
    setDescription(todoToEdit.description);
    setStatus(todoToEdit.status);
    setEditTodoId(id);
  };

  const handleUpdateTodo = () => {
    if (taskName.trim() !== '' && description.trim() !== '') {
      setTodos(todos.map(todo => {
        if (todo.id === editTodoId) {
          return {
            ...todo,
            taskName,
            description,
            status
          };
        }
        return todo;
      }));
      setTaskName('');
      setDescription('');
      setStatus('not completed');
      setEditTodoId(null);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.status === 'completed';
    } else if (filter === 'not completed') {
      return todo.status === 'not completed';
    }
    return true;
  });

  return (
    <div className="container">
      <h1 className="my-4 text-center" id="todo-header">My Todo App</h1>
      <div className="row mb-5">
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mb-3">
          <input type="text" className="form-control" id="todo-name" placeholder="Todo Name" value={taskName} onChange={handleTaskNameChange} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mb-3">
          <input type="text" className="form-control" id="todo-description" placeholder="Todo Description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-2 col-xxl-2 mb-3">
          <select className="form-select" id="status-select" aria-label="Status select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-12 col-xl-2 col-xxl-2" id="add-todo-container">
          <button className="btn btn-primary" id="add-todo-btn" onClick={editTodoId ? handleUpdateTodo : handleCreateTodo}>{editTodoId ? 'Update Todo' : 'Add Todo'}</button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id="mytodos-header-area">
          <div id="mytodos-header">My Todos</div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end align-items-center" id="status-filter-area">
          <div id="status-filter-header">Status Filter : </div>
          <select className="form-select" id="all-status-filter" aria-label="Filter select" value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredTodos.map(todo => (
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mb-3" key={todo.id}>
            <div className="card" id={`${todo.id}`}>
              <div className="card-body">
                <h5 className="card-title card-todo-name" id={`${todo.id}`}>Name : {todo.taskName}</h5>
                <p className="card-text card-todo-description" id={`${todo.id}`}>Description : {todo.description}</p>
                <p className="card-todo-status" id={`${todo.id}`}>Status :
                  <select className={`form-control-sm ${todo.status === 'completed' ? 'todo-success' : 'todo-danger'} card-status-selection`} id={`${todo.id}`}
                    value={todo.status} onChange={(e) => handleStatusChange(todo.id, e.target.value)}>
                    <option value="not completed">Not Completed</option>
                    <option value="completed">Completed</option>
                  </select>
                </p>
                <div className="d-flex justify-content-end gap-3">
                  <button className="btn btn-success card-edit-btn" id={`${todo.id}`} onClick={() => handleEditTodo(todo.id)}>Edit</button>
                  <button className="btn btn-danger card-delete-btn" id={`${todo.id}`} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
