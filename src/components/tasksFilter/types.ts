export interface FiltersProps {
  createTask: () => void;
  changePriorityFilter: (value: string) => void;
  changeStatusFilter: (value: string) => void;
  selectedPriorities: string[];
  selectedStatuses: string[];
  sortBy: string | undefined;
  sortDropdownChange: (value: string) => void;
}
