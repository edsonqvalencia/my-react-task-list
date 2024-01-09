import React from 'react';

const Task = ({ descripcion, completado }) => {
  return (
    <li>
      <span>{descripcion}</span>
      <input type="checkbox" checked={completado} readOnly />
    </li>
  );
};

export default Task;
