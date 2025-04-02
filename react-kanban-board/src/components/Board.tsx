import * as React from 'react';
import { useState, useEffect } from 'react';
import { ColumnData, CardData } from '../types';
import Column from './Column';
import { v4 as uuidv4 } from 'uuid';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// Key for local storage
const LOCAL_STORAGE_KEY = 'kanbanBoardState';

// Function to load state from local storage
const loadState = (): ColumnData[] => {
  try {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      // TODO: Add more robust validation/migration logic if needed
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Error loading state from local storage:", error);
  }
  // Return initial default state if nothing is saved or loading fails
  return [
    { id: uuidv4(), title: 'To Do', cards: [
      { id: uuidv4(), pbiId: 'PBI-101', content: 'Learn React', remainingTime: 5, colorTag: 'blue.500' },
      { id: uuidv4(), pbiId: 'PBI-102', content: 'Build Kanban Board', remainingTime: 8 },
      { id: uuidv4(), pbiId: 'PBI-103', content: 'Implement Drag and Drop', colorTag: 'purple.500' }
    ]},
    { id: uuidv4(), title: 'In Progress', cards: [
      { id: uuidv4(), pbiId: 'PBI-201', content: 'Set up project', remainingTime: 1, colorTag: 'orange.500' }
    ]},
    { id: uuidv4(), title: 'Done', cards: [] },
  ];
};

const Board: React.FC = () => {
  // Initialize state by loading from local storage
  const [columns, setColumns] = useState<ColumnData[]>(loadState);

  // Effect to save state to local storage whenever columns change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
      console.log('Board state saved to local storage');
    } catch (error) {
      console.error("Error saving state to local storage:", error);
    }
  }, [columns]); // Dependency array ensures this runs when columns change

  const addCard = (columnId: string, content: string) => {
    const newPbiId = `PBI-${uuidv4().substring(0, 4).toUpperCase()}`;
    const newCard: CardData = {
      id: uuidv4(),
      pbiId: newPbiId,
      content: content,
    };
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      )
    );
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter(card => card.id !== cardId) }
          : column
      )
    );
  };

  // Function to edit card data
  const editCard = (cardId: string, updatedData: Partial<Omit<CardData, 'id'>>) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        cards: column.cards.map(card =>
          card.id === cardId
            ? { ...card, ...updatedData } // Merge updated data
            : card
        )
      }))
    );
    console.log(`Card ${cardId} edited with:`, updatedData); // Log edit
  };

  const onDragEnd = (result: DropResult) => {
    console.log('onDragEnd triggered:', result);
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = columns.find(col => col.id === source.droppableId);
    const endColumn = columns.find(col => col.id === destination.droppableId);
    if (!startColumn || !endColumn) return;
    const draggedCard = startColumn.cards.find(card => card.id === draggableId);
    if (!draggedCard) return;

    if (startColumn.id === endColumn.id) {
      const newCards = Array.from(startColumn.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggedCard);
      const newColumn = { ...startColumn, cards: newCards };
      setColumns(prevColumns => prevColumns.map(col => (col.id === newColumn.id ? newColumn : col)));
    } else {
      const startCards = Array.from(startColumn.cards);
      startCards.splice(source.index, 1);
      const newStartColumn = { ...startColumn, cards: startCards };
      const endCards = Array.from(endColumn.cards);
      endCards.splice(destination.index, 0, draggedCard);
      const newEndColumn = { ...endColumn, cards: endCards };
      setColumns(prevColumns => prevColumns.map(col => {
        if (col.id === newStartColumn.id) return newStartColumn;
        if (col.id === newEndColumn.id) return newEndColumn;
        return col;
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box p="4" bg="gray.100" minH="100vh">
        <Heading as="h1" size="xl" textAlign="center" mb="6">
          React Kanban Board
        </Heading>
        <HStack spacing={4} align="flex-start">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              addCard={addCard}
              deleteCard={deleteCard}
              editCard={editCard} // Pass editCard function
            />
          ))}
        </HStack>
      </Box>
    </DragDropContext>
  );
};

export default Board;