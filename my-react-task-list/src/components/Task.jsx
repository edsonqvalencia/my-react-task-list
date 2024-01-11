import React, { useState } from 'react';
import { ListItem, Flex, Text, Checkbox, Button, Input } from '@chakra-ui/react';

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
    <ListItem>
      {isEditing ? (
        <Flex align="center">
          <Input
            type="text"
            value={editedDescription}
            onChange={handleDescriptionChange}
            flex="1"
          />
          <Button onClick={handleSaveClick} colorScheme="green" ml="2">
            Guardar
          </Button>
        </Flex>
      ) : (
        <Flex align="center">
          <Text flex="1">{descripcion}</Text>
          <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
          <Button onClick={handleEditClick} colorScheme="teal" ml="2">
            Editar
          </Button>
          <Button onClick={handleDeleteClick} colorScheme="red" ml="2">
            Eliminar
          </Button>
        </Flex>
      )}
    </ListItem>
  );
};

export default Task;
