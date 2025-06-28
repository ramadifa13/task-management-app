/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Column from "@/components/column";
import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, moveTask } from "@/store/taskSlice";
import { Status, Task } from "@/types/task";

export default function Home() {
  const dispatch = useDispatch();
  const statuses = ["To Do", "In Progress", "Done"] as const;

  const [activeInput, setActiveInput] = useState<Status | null>(null);
  const [inputKey, setInputKey] = useState(0); 

  const handleShowInput = (status: Status) => {
    setActiveInput(status);
    setInputKey((prev) => prev + 1); 
  };

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      const tasks = JSON.parse(saved);
      tasks.forEach((task: Task) => dispatch(addTask(task)));
    }
  }, [dispatch]);

  const handleDragEnd = (result: any) => {
    const { draggableId, destination } = result;
    if (!destination) return;
    dispatch(
      moveTask({
        id: draggableId,
        status: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="hidden lg:grid grid-cols-3 gap-4 p-6 bg-blue-600 min-h-screen">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status as Status}
            showInput={activeInput === status}
            onShowInput={() => handleShowInput(status as Status)}
            onHideInput={() => setActiveInput(null)}
            inputKey={inputKey}
          />
        ))}
      </main>
      <div className="lg:hidden min-h-screen flex items-center justify-center bg-blue-600 text-white text-center p-4">
        <p className="text-lg font-semibold">
          This Kanban board is only available on desktop (≥1024px).
        </p>
      </div>
    </DragDropContext>
  );
}
