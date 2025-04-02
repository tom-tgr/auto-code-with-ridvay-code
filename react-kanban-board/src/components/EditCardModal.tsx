import * as React from 'react';
import { useState, useEffect } from 'react';
import { CardData } from '../types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  VStack,
} from '@chakra-ui/react';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: CardData;
  onSave: (updatedData: Partial<Omit<CardData, 'id'>>) => void;
}

// Simple list of colors for the tag
const colorOptions = [
  { value: '', label: 'None' },
  { value: 'red.500', label: 'Red' },
  { value: 'orange.500', label: 'Orange' },
  { value: 'yellow.500', label: 'Yellow' },
  { value: 'green.500', label: 'Green' },
  { value: 'teal.500', label: 'Teal' },
  { value: 'blue.500', label: 'Blue' },
  { value: 'cyan.500', label: 'Cyan' },
  { value: 'purple.500', label: 'Purple' },
  { value: 'pink.500', label: 'Pink' },
  { value: 'gray.500', label: 'Gray' },
];

const EditCardModal: React.FC<EditCardModalProps> = ({ isOpen, onClose, card, onSave }) => {
  // State to hold the form data, initialized with current card data
  const [pbiId, setPbiId] = useState(card.pbiId);
  const [content, setContent] = useState(card.content);
  const [remainingTime, setRemainingTime] = useState<number | undefined>(card.remainingTime);
  const [colorTag, setColorTag] = useState(card.colorTag || '');

  // Reset form state when the card prop changes (e.g., when opening modal for a different card)
  useEffect(() => {
    setPbiId(card.pbiId);
    setContent(card.content);
    setRemainingTime(card.remainingTime);
    setColorTag(card.colorTag || '');
  }, [card]);

  const handleSaveClick = () => {
    const updatedData: Partial<Omit<CardData, 'id'>> = {
      pbiId,
      content,
      remainingTime: remainingTime,
      colorTag: colorTag === '' ? undefined : colorTag, // Store empty string as undefined
    };
    onSave(updatedData);
  };

  // Handle changes in NumberInput specifically for remainingTime
  const handleTimeChange = (valueAsString: string, valueAsNumber: number) => {
    setRemainingTime(isNaN(valueAsNumber) ? undefined : valueAsNumber);
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Card (ID: {card.pbiId})</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>PBI ID</FormLabel>
              <Input value={pbiId} onChange={(e) => setPbiId(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input value={content} onChange={(e) => setContent(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Remaining Time (h)</FormLabel>
              <NumberInput
                value={remainingTime ?? ''} // Handle undefined for input value
                onChange={handleTimeChange}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Color Tag</FormLabel>
              <Select value={colorTag} onChange={(e) => setColorTag(e.target.value)}>
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCardModal;