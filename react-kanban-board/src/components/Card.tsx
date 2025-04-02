import * as React from 'react';
import { useState } from 'react';
import { CardData } from '../types';
import { Box, Text, IconButton, HStack, VStack, Badge } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Draggable } from 'react-beautiful-dnd';
import EditCardModal from './EditCardModal'; // Import the modal component

interface CardProps {
  card: CardData;
  index: number;
  columnId: string;
  deleteCard: (columnId: string, cardId: string) => void;
  editCard: (cardId: string, updatedData: Partial<Omit<CardData, 'id'>>) => void;
}

const Card: React.FC<CardProps> = ({ card, index, columnId, deleteCard, editCard }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteCard(columnId, card.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  // Pass the editCard function directly to the modal's onSave
  const handleSaveChanges = (updatedData: Partial<Omit<CardData, 'id'>>) => {
    editCard(card.id, updatedData);
    setIsEditing(false);
  };


  return (
    <> {/* Use Fragment to render Modal alongside Card */}
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            bg={snapshot.isDragging ? 'blue.50' : 'white'}
            p={3}
            borderRadius="md"
            boxShadow="sm"
            position="relative"
            _hover={{ boxShadow: 'md' }}
            display="flex"
            alignItems="center"
            mb={3}
          >
            {/* Color Tag */}
            {card.colorTag && (
              <Box
                w="8px"
                h="80%"
                bg={card.colorTag}
                borderRadius="sm"
                mr={3}
              />
            )}

            {/* Main Content Area */}
            <VStack align="stretch" spacing={1} flexGrow={1}>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500">ID: {card.pbiId}</Text>
                {typeof card.remainingTime === 'number' && (
                  <Badge colorScheme="green" size="sm">
                    {card.remainingTime}h
                  </Badge>
                )}
              </HStack>
              <Text fontSize="sm" fontWeight="medium">{card.content}</Text>
            </VStack>

            {/* Buttons */}
            <HStack spacing={0} ml={2}>
              <IconButton
                aria-label="Edit card"
                icon={<EditIcon />}
                size="xs"
                variant="ghost"
                onClick={handleEditClick} // Set isEditing to true
              />
              <IconButton
                aria-label="Delete card"
                icon={<DeleteIcon />}
                size="xs"
                variant="ghost"
                colorScheme="red"
                onClick={handleDelete}
              />
            </HStack>
          </Box>
        )}
      </Draggable>

      {/* Render the modal conditionally */}
      <EditCardModal
        isOpen={isEditing}
        onClose={handleCloseEdit}
        card={card}
        onSave={handleSaveChanges}
      />
    </>
  );
};

export default Card;