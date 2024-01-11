import React, { useState } from 'react';
import Task from './Task';
import useTaskManager from '../Hooks/useTaskManager';
import '../App.css';

const TaskList = () => {
  const { tasks, addTask, deleteTask, updateTask, validateTask } = useTaskManager();
  const [formValues, setFormValues] = useState({ title: '', description: '' });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleToggleComplete = (id, completed) => {
    updateTask(id, { completado: completed });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const { title, description } = formValues;

    try {
      validateTask(title, description);
      addTask(title, description);
      setFormValues({ title: '', description: '' });
      setErrorMessage(null);
    } catch (error) {
      console.error("Error al agregar tarea:", error.message);
      setErrorMessage(error.message);
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleEditTask = (id, newDescription) => {
    updateTask(id, { descripcion: newDescription });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div>
      <h2>Lista de tareas</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleAddTask}>
        <label>
          Indicador:
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.indicador}
            id={task.indicador}
            descripcion={task.descripcion}
            completado={task.completado}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;