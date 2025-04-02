import * as React from 'react'; // Use namespace import
import * as ReactDOM from 'react-dom/client'; // Use namespace import
import { ChakraProvider } from '@chakra-ui/react';
import Board from './components/Board.tsx';
import './style.css' // Keep base styles for now, might remove later

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Removed React.StrictMode
  <ChakraProvider> {/* Wrap Board with ChakraProvider */}
    <Board />
  </ChakraProvider>,
)