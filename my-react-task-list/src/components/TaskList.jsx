import React from 'react';
import Task from './Task';

const TaskList = () => {
  const tasks = [
    { indicador: "tarea1", descripcion: "Lavar la ropa", completado: false },
    { indicador: "tarea2", descripcion: "Hacer las compras", completado: false }
  ];

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul>
        {tasks.map((task) => (
          <Task key={task.indicador} descripcion={task.descripcion} completado={task.completado} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
