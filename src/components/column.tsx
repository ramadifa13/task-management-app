/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addTask } from "@/store/taskSlice";
import { Task, ColumnProps } from "@/types/task";
import TaskCard from "./taskCard";
import { Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { statusColorMap } from "@/utils/statusColorMap";


const Column = ({ status, showInput, onShowInput, onHideInput, inputKey }: ColumnProps) => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) =>
    state.tasks.filter((task) => task.status === status)
  );
  const allTasks = useSelector((state: RootState) => state.tasks);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    setNewTitle("");
  }, [inputKey]);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const nextIdNumber = allTasks.length + 1;
    const newId = `SM-${nextIdNumber}`;

    const newTask: Task = {
      id: newId,
      title: newTitle.trim(),
      description: "",
      priority: "Medium",
      status,
    };

    dispatch(addTask(newTask));
    setNewTitle("");
    onHideInput();
  };

  const currentColor = statusColorMap[status];

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 rounded-lg w-full shadow p-4 flex flex-col h-fit"
        >
          <div className="flex gap-2 items-center mb-4 px-5">
            <h2
              className={`text-md font-semibold uppercase px-2 rounded ${currentColor.text} ${currentColor.bg}`}
            >
              {status}
            </h2>
            <span className="text-md text-gray-500">{tasks.length}</span>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {tasks.map((task, idx) => (
              <TaskCard key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </div>

          <div className="mt-4 px-5">
            {showInput ? (
              <div className="relative">
                <textarea
                  key={inputKey}
                  className={`w-full p-2 text-sm border rounded resize-none text-black transition-all ${
                    newTitle
                      ? "border-2 border-blue-500"
                      : "border border-gray-300"
                  }
    focus:border-2 focus:border-blue-500 focus:outline-none`}
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  rows={3}
                  style={{ paddingBottom: "2.5rem" }}
                />

                <button
                  onClick={handleCreate}
                  className="absolute bottom-2 right-2 text-sm px-3 py-1 mb-2 bg-blue-600 text-white rounded shadow"
                >
                  Create
                </button>
              </div>
            ) : (
              <button
                onClick={onShowInput}
                className="text-md font-bold flex items-center gap-1 text-gray-600 hover:shadow-2xl mt-2"
              >
                <Plus size={20} color="#4b5563" />
                <span>Create</span>
              </button>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
