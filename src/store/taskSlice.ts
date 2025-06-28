import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Status } from "@/types/task";
import SecureStorage from "react-secure-storage";

const initialState: Task[] = [];

const persist = (tasks: Task[]) => {
  SecureStorage.setItem("tasks", JSON.stringify(tasks));
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      persist(state);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const idx = state.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
      persist(state);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newTasks = state.filter((t) => t.id !== action.payload);
      persist(newTasks);
      return newTasks;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        id: string;
        status: Status;
        destinationIndex: number;
      }>
    ) => {
      const { id, status, destinationIndex } = action.payload;
      const oldIndex = state.findIndex((t) => t.id === id);
      if (oldIndex === -1) return;
      const [movedTask] = state.splice(oldIndex, 1);
      movedTask.status = status;

      const tasksInStatus = state.filter((t) => t.status === status);

      let insertAt = 0;
      if (
        tasksInStatus.length === 0 ||
        destinationIndex >= tasksInStatus.length
      ) {
        insertAt = state.reduce(
          (lastIdx, t, idx) => (t.status === status ? idx + 1 : lastIdx),
          0
        );
      } else {
        let count = -1;
        insertAt = state.findIndex((t) => {
          if (t.status === status) count++;
          return count === destinationIndex;
        });
        if (insertAt === -1) insertAt = state.length;
      }

      state.splice(insertAt, 0, movedTask);
      persist(state);
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
