import React from 'react';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  return (
    <ChakraProvider>
      <VStack minH="100vh" spacing={8} justify="center" align="center">
        <Header />
        <TaskList />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
