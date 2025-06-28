"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { useState, useRef } from "react";
import { Task, Priority } from "@/types/task";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/store/taskSlice";
import {
  ChevronDown,
  SquareCheck,
  Trash2,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { priorityIconMap, priorityColorMap } from "@/utils/priorityMap";
import { TaskModalProps } from "@/types/task";


const TaskModal = ({ task, open, onOpenChange }: TaskModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Priority>(task.priority);

  const [editField, setEditField] = useState<
    null | "title" | "description" | "priority"
  >(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (editField === "title") titleInputRef.current?.focus();
    if (editField === "description") descInputRef.current?.focus();
  }, [editField]);

  const handleSave = (updated: Partial<Task>) => {
    dispatch(updateTask({ ...task, ...updated }));
    setEditField(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "description"
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave(field === "title" ? { title } : { description });
    }
    if (e.key === "Escape") setEditField(null);
  };
  const priorities: Priority[] = ["Low", "Medium", "High"];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] sm:w-full max-w-lg">
          <div className="bg-white p-8 rounded-lg shadow-xl border relative">
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this task?"
                );
                if (confirmed) {
                  dispatch(deleteTask(task.id));
                  onOpenChange(false);
                }
              }}
              className="absolute top-4 right-4 transition"
              title="Delete Task"
            >
              <Trash2 size={18} color="red" />
            </button>
            <Dialog.Title className="sr-only">Detail Task</Dialog.Title>
            <div className="flex items-center gap-2 mb-4 text-gray-500">
              <div className="rounded-full flex items-center justify-center">
                <SquareCheck size={20} fill="blue" color="white" />
              </div>
              <span className="text-[14px] font-mono">
                {task.id.slice(0, 6)}
              </span>
            </div>
            <div className="mb-4">
              {editField === "title" ? (
                <input
                  ref={titleInputRef}
                  className="text-2xl font-bold w-full border-b focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => handleSave({ title })}
                  onKeyDown={(e) => handleKeyDown(e, "title")}
                />
              ) : (
                <h2
                  className="text-2xl font-bold cursor-pointer hover:bg-gray-100 px-1"
                  onClick={() => setEditField("title")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditField("title");
                  }}
                >
                  {title}
                </h2>
              )}
            </div>
            <div className="mb-6">
              <div className="font-semibold text-gray-700 mb-1">
                Description
              </div>
              {editField === "description" ? (
                <textarea
                  ref={descInputRef}
                  className="w-full border-b focus:outline-none"
                  value={description}
                  rows={2}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => handleSave({ description })}
                  onKeyDown={(e) => handleKeyDown(e, "description")}
                />
              ) : (
                <div
                  className="cursor-pointer hover:bg-gray-100 px-1"
                  onClick={() => setEditField("description")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditField("description");
                  }}
                >
                  {description || (
                    <span className="text-gray-400">No description</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold text-gray-700 mb-1">Priority</div>
              {editField === "priority" ? (
                <Select.Root
                  value={priority}
                  onValueChange={(val) => {
                    setPriority(val as Priority);
                    handleSave({ priority: val as Priority });
                    setEditField(null);
                  }}
                >
                  <Select.Trigger className="inline-flex items-center justify-between border px-3 py-1 rounded w-40 text-sm text-gray-700 bg-white shadow focus:outline-none">
                    <Select.Value asChild>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = priorityIconMap[priority];
                          const color = priorityColorMap[priority];
                          return (
                            <>
                              <Icon size={16} className={color} />
                              <span>{priority}</span>
                            </>
                          );
                        })()}
                      </div>
                    </Select.Value>
                    <Select.Icon>
                      <ChevronDown size={16} strokeWidth={5} />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="bg-white border shadow rounded text-sm z-50">
                      <Select.Viewport className="p-1">
                        {priorities.map((p) => {
                          const Icon = priorityIconMap[p];
                          const color = priorityColorMap[p];
                          return (
                            <Select.Item
                              key={p}
                              value={p}
                              className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-2 text-gray-700"
                            >
                              <Icon size={16} className={color} />
                              <Select.ItemText>{p}</Select.ItemText>
                            </Select.Item>
                          );
                        })}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-1 w-fit"
                  onClick={() => setEditField("priority")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditField("priority");
                  }}
                >
                  {(() => {
                    const Icon = priorityIconMap[priority];
                    const color = priorityColorMap[priority];
                    return (
                      <>
                        <Icon size={20} className={color} />
                        <span>{priority}</span>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TaskModal;
