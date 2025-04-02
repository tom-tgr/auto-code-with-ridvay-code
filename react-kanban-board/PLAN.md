# Project: React Kanban Board (with TypeScript)

**Goal:** Create a functional Kanban board application using React and TypeScript, allowing users to manage tasks across different columns with drag-and-drop, CRUD operations, and data persistence via browser local storage.

**1. Project Setup:**

*   Initialize a new React project using **Vite with the React TypeScript template**.
    *   Command: `npm create vite@latest react-kanban-board --template react-ts`
*   This sets up the basic project structure, build tooling, development server, and TypeScript configuration.
*   Project directory: `react-kanban-board`. (Note: Implementation should handle creating files *within* this directory, likely after it's created by the Vite command).

**2. Component Structure:**

*   Use `.tsx` files.
*   Define TypeScript `interface` or `type` definitions (e.g., in `src/types.ts`).

    ```typescript
    // Example types (src/types.ts)
    export interface CardData {
      id: string;
      content: string;
    }

    export interface ColumnData {
      id: string;
      title: string;
      cards: CardData[];
    }
    ```

*   Mermaid Diagram of Components:
    ```mermaid
    graph TD
        App[App.tsx] --> Board[Board.tsx];
        Board --> Column[Column.tsx * n];
        Column --> Card[Card.tsx * m];
        Column --> AddCardButton;
        Card --> EditButton;
        Card --> DeleteButton;
    ```

*   **Components:**
    *   `src/App.tsx`: Main application component.
    *   `src/components/Board.tsx`: Manages state (`ColumnData[]`), DnD logic, persistence.
    *   `src/components/Column.tsx`: Represents a column, receives `ColumnData`.
    *   `src/components/Card.tsx`: Represents a task, receives `CardData`.
    *   Helper Components (Buttons, Modals, etc.) in `src/components/`.

**3. State Management:**

*   Primary state: `useState<ColumnData[]>([])` in `Board.tsx`.
*   State update functions use defined TypeScript types.

**4. CRUD Operations:**

*   **Create:** Add new `CardData` object to state.
*   **Read:** Load `ColumnData[]` from local storage (with validation) or use default typed data.
*   **Update:** Modify `CardData` objects in state.
*   **Delete:** Remove `CardData` objects by `id`.

**5. Drag and Drop (DnD):**

*   Use `react-beautiful-dnd`. Install with types: `npm install react-beautiful-dnd @types/react-beautiful-dnd`.
*   Use typed `onDragEnd` handler (`DropResult`) to update state.

**6. Local Storage Persistence:**

*   Use `useEffect` in `Board.tsx`.
*   Load: `localStorage.getItem('kanbanBoardState')`. Parse JSON and validate against `ColumnData[]`.
*   Save: `localStorage.setItem('kanbanBoardState', JSON.stringify(state))`.

**7. Styling:**

*   Start with basic CSS (e.g., `src/index.css`, `src/App.css`) or CSS Modules. (Tailwind can be added later if desired).

**8. High-Level Implementation Steps:**

1.  Setup React/TS project (`npm create vite@latest react-kanban-board --template react-ts`).
2.  Navigate into the project: `cd react-kanban-board`.
3.  Install DnD library (`npm install react-beautiful-dnd @types/react-beautiful-dnd`).
4.  Define types in `src/types.ts`.
5.  Create component structure (`.tsx` files) in `src/components/`.
6.  Implement typed state management in `Board.tsx`.
7.  Implement rendering based on state.
8.  Implement CRUD operations (Create, Delete, Update).
9.  Integrate `react-beautiful-dnd`.
10. Implement `onDragEnd` handler.
11. Implement local storage load/save with validation.
12. Apply basic styling.
13. Test and refine.