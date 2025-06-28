"use client";

import { TaskCardProps } from "@/types/task";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TaskModal from "./taskModal";
import {
  SquareCheck,
  Check,
} from "lucide-react";
import { priorityIconMap, priorityColorHexMap } from "@/utils/priorityMap";

const TaskCard = ({ task, index }: TaskCardProps) => {
  const [open, setOpen] = useState(false);

  const PriorityIcon = priorityIconMap[task.priority];
  const priorityColor = priorityColorHexMap[task.priority];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setOpen(true)}
            className="cursor-pointer bg-white p-3 mb-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition relative"
          >
            <h3 className=" text-sm sm:text-base  mb-2 line-clamp-2">
              {task.title}
            </h3>
            <div className="flex items-center justify-between text-xs mt-6">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="rounded-full flex items-center justify-center">
                  <SquareCheck size={20} fill="blue" color="white" />
                </div>
                <span className="text-[14px] font-mono">
                  {task.id.slice(0, 6)}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                {task.status === "Done" && (
                  <Check size={20} color="green" className="mr-1" />
                )}
                <PriorityIcon size={20} color={priorityColor} />
              </div>
            </div>
          </div>
          {open && <TaskModal task={task} open={open} onOpenChange={setOpen} />}
        </>
      )}
    </Draggable>
  );
};

export default TaskCard;
