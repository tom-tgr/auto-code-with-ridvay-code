import * as React from 'react';
import { useState } from 'react';
import { ColumnData } from '../types';
import Card from './Card';
import { Box, Heading, VStack, Textarea, Button } from '@chakra-ui/react';
// Import Droppable
import { Droppable } from 'react-beautiful-dnd';

import { CardData } from '../types'; // Import CardData for the editCard signature

interface ColumnProps {
  column: ColumnData;
  addCard: (columnId: string, content: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  editCard: (cardId: string, updatedData: Partial<Omit<CardData, 'id'>>) => void; // Add editCard prop type
}

const Column: React.FC<ColumnProps> = ({ column, addCard, deleteCard, editCard }) => { // Destructure editCard
  const [newCardContent, setNewCardContent] = useState('');

  const handleAddCard = () => {
    if (newCardContent.trim() === '') return;
    addCard(column.id, newCardContent);
    setNewCardContent('');
  };

  return (
    <Box
      bg="gray.200"
      p={4}
      borderRadius="md"
      w="300px"
      h="fit-content"
      maxH="calc(100vh - 120px)"
      display="flex"
      flexDirection="column"
    >
      <Heading as="h3" size="md" mb={4} pb={2} borderBottom="1px" borderColor="gray.300">
        {column.title}
      </Heading>

      {/* Make the card list area Droppable */}
      <Droppable droppableId={column.id} type="CARD">
        {(provided, snapshot) => (
          <VStack
            ref={provided.innerRef} // Apply ref from Droppable
            {...provided.droppableProps} // Apply droppableProps
            spacing={3}
            align="stretch"
            overflowY="auto"
            flexGrow={1}
            pr={2}
            bg={snapshot.isDraggingOver ? 'blue.100' : 'transparent'} // Visual feedback when dragging over
            transition="background-color 0.2s ease" // Smooth transition for background
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index} // Pass index for Draggable
                columnId={column.id}
                deleteCard={deleteCard}
                editCard={editCard} // Pass editCard down to Card
              />
            ))}
            {provided.placeholder} {/* Add placeholder for spacing during drag */}
          </VStack>
        )}
      </Droppable>

      {/* Add Card Input and Button */}
      <VStack spacing={2} align="stretch" mt="auto" pt={4}>
        <Textarea
          placeholder="Enter card content..."
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
          size="sm"
          rows={3}
          resize="none"
        />
        <Button onClick={handleAddCard} size="sm" colorScheme="blue">
          + Add Card
        </Button>
      </VStack>
    </Box>
  );
};

export default Column;