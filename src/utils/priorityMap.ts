import { ChevronUp, Equal, ChevronDown } from "lucide-react";
import { Priority } from "@/types/task";

export const priorityIconMap: Record<Priority, React.ElementType> = {
  High: ChevronUp,
  Medium: Equal,
  Low: ChevronDown,
};

export const priorityColorMap: Record<Priority, string> = {
  High: "text-red-600",
  Medium: "text-orange-600",
  Low: "text-blue-600",
};

export const priorityColorHexMap: Record<Priority, string> = {
  High: "red",
  Medium: "orange",
  Low: "blue",
};