export interface CardData {
  id: string; // Unique identifier for React key and DnD
  pbiId: string; // Displayable PBI ID (can be different from id)
  content: string; // Title or description
  remainingTime?: number; // Optional remaining time
  colorTag?: string; // Optional color tag (e.g., 'blue.500')
}

export interface ColumnData {
  id: string;
  title: string;
  cards: CardData[];
}