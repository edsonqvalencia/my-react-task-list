import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box p="4" bg="purple.500">
      <Heading as="h1" color="white">
        Mi lista de tareas personalizada
      </Heading>
    </Box>
  );
};

export default Header;