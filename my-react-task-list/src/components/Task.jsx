import React, { useState } from 'react';

const Task = ({ descripcion, completado }) => {
  const [isChecked, setIsChecked] = useState(completado);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li>
      <span>{descripcion}</span>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    </li>
  );
};

export default Task;
