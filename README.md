# Task Management Application

A Kanban-style task management app built with [Next.js](https://nextjs.org), [Redux Toolkit](https://redux-toolkit.js.org/), and [Tailwind CSS](https://tailwindcss.com/).

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ramadifa13/task-management-app.git
   cd task-management-application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure & Approach

### State Management

- **Redux Toolkit** is used for global state management, handling all task operations (add, update, delete, move).
- The Redux store is provided to the app via a custom `StoreProvider` ([src/store/storeProvider.tsx](src/store/storeProvider.tsx)).

### Storage Solution

- **Local Storage** is used to persist tasks between sessions.
- On app load, tasks are loaded from local storage and dispatched to the Redux store.

### UI Components

- **Radix UI** is used for accessible dialogs and selects.
- **Lucide React** provides icons.
- **@hello-pangea/dnd** enables drag-and-drop for Kanban columns.
- **Tailwind CSS** is used for styling.

### Folder Structure

```
src/
  app/           # Next.js app directory (entry, layout, global styles)
  components/    # Reusable UI components (Column, TaskCard, TaskModal)
  store/         # Redux store, slice, and provider
  types/         # TypeScript types for tasks and props
  utils/         # Utility maps for priority and status
```

### Data Handling

- Tasks are uniquely identified and stored in Redux state.
- All CRUD operations and drag-and-drop reordering are handled via Redux actions.
- UI updates are immediate and persisted to local storage.

---

## Known Issues / Time Limitations

- **No task due dates or subtasks:** Only basic fields (title, description, priority, status).
- **No advanced filtering or search.**
- **Minimal validation:** Task title is required, but no further validation.

---

## Possible Improvements

Given more time, the following enhancements could be made:

- **Task ordering:** Persist custom ordering within columns.
- **Task details:** Add due dates, labels, attachments, and comments.
- **Unit and integration tests:** Add automated tests for components and logic.
- **Performance:** Optimize rendering for large numbers of tasks.

---

Created by Ramadifa Esa Putra
