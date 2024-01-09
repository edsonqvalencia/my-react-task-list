import React from 'react';
import Task from './Task';
import useTaskManager from '@/hooks/useTaskManager';

const TaskList = () => {
  const { tasks, addTask, deleteTask, updateTask } = useTaskManager();

const handleToggleComplete = (id, completed) => {
  // Llama a la función updateTask del hook
  updateTask(id, { completado: completed });
};

const handleAddTask = (e) => {
  // Llama a la función addTask del hook
  const title = e.target.title.value;
  const description = e.target.description.value;
  addTask(title, description);
  // Reinicia los valores del formulario
  e.target.reset();
};

const handleDeleteTask = (id) => {
  // Llama a la función deleteTask del hook
  deleteTask(id);
};

const handleEditTask = (id, newDescription) => {
  // Llama a la función updateTask del hook
  updateTask(id, { descripcion: newDescription });
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask(e);
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