export type Status = 'To Do' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}

export interface TaskCardProps {
  task: Task;
  index: number;
}

export interface ColumnProps {
  status: Status;
  showInput: boolean;
  onShowInput: () => void;
  onHideInput: () => void;
  inputKey: number; 
}

export interface TaskModalProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
