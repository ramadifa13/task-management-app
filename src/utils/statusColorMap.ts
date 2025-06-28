import { Status } from "@/types/task";

export const statusColorMap: Record<Status, { bg: string; text: string }> = {
  "To Do": {
    bg: "bg-gray-200",
    text: "text-gray-700",
  },
  "In Progress": {
    bg: "bg-blue-200",
    text: "text-blue-700",
  },
  Done: {
    bg: "bg-green-200",
    text: "text-green-700",
  },
};