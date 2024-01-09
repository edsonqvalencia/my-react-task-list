import { useState, useEffect } from 'react';

const useTaskManager = () => {
  const initialTasks = [
    { indicador: "tarea1", descripcion: "Lavar la ropa", completado: false },
    { indicador: "tarea2", descripcion: "Hacer las compras", completado: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      indicador: `tarea${tasks.length + 1}`,
      descripcion: description,
      completado: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.indicador !== id);
    setTasks(updatedTasks);
  };

   const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.indicador === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  return { tasks, addTask, deleteTask, updateTask };
};

export default useTaskManager;