import type { Task } from "../../types/general.types";

export interface TaskPopupProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}
