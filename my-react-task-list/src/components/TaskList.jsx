import React, { useState } from 'react';
import { VStack, Heading, Box, FormControl, Input, Button, List } from '@chakra-ui/react';
import Task from './Task';
import useTaskManager from '../Hooks/useTaskManager';

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
    <VStack align="center" spacing="4">
      <Heading as="h2" size="lg">
        Añada, edite o elimine tareas
      </Heading>
      {errorMessage && <Box color="red.500">{errorMessage}</Box>}
      <form onSubmit={handleAddTask}>
        <FormControl>
          <Input
            type="text"
            name="title"
            placeholder="Indicador"
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl>
          <Input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formValues.description}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="purple">
          Agregar Tarea
        </Button>
      </form>
      <List spacing="3" maxW="md">
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
      </List>
    </VStack>
  );
};

export default TaskList;