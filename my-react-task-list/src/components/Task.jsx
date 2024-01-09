import React, { useState } from 'react';

const Task = ({ id, descripcion, completado, onToggleComplete, onDelete, onEdit }) => {
  const [isChecked, setIsChecked] = useState(completado);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(descripcion);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggleComplete(id, !isChecked);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, editedDescription);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={editedDescription} onChange={handleDescriptionChange} />
          <button onClick={handleSaveClick}>Guardar</button>
        </>
      ) : (
        <>
          <span>{descripcion}</span>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteClick}>Eliminar</button>
        </>
      )}
    </li>
  );
};

export default Task;
