import React, { useState, useEffect } from 'react';
import Task from './Task';

const TaskList = () => {
  const initialTasks = [
    { indicador: "tarea1", descripcion: "Lavar la ropa", completado: false },
    { indicador: "tarea2", descripcion: "Hacer las compras", completado: false }
  ];

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleComplete = (id, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.indicador === id ? { ...task, completado: completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (title, description) => {
    const newTask = {
      indicador: `tarea${tasks.length + 1}`,
      descripcion: description,
      completado: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.indicador !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (id, newDescription) => {
  const updatedTasks = tasks.map((task) =>
    task.indicador === id ? { ...task, descripcion: newDescription } : task
  );
  setTasks(updatedTasks);
};

  return (
    <div>
      <h2>Lista de tareas</h2>
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
      {/* Aquí puedes agregar un formulario para agregar tareas */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          handleAddTask(title, description);
          e.target.reset();
        }}
      >
        <label>
          Indicador:
          <input type="text" name="title" required />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" required />
        </label>
        <button type="submit">Agregar Tarea</button>
      </form>
    </div>
  );
};

export default TaskList;