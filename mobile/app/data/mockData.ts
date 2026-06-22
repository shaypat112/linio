//  delete this file for later when we Obtain REAL ddata
//
// // linio/mobile/app/data/mockData.ts

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
  dueDate?: string;
}

export const mockTodos: Todo[] = [
  {
    id: 1,
    title: "Complete math homework",
    completed: false,
    priority: "high",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Study for history quiz",
    completed: false,
    priority: "medium",
    dueDate: "Tomorrow",
  },
  {
    id: 3,
    title: "Submit English essay",
    completed: true,
    priority: "high",
    dueDate: "Yesterday",
  },
  {
    id: 4,
    title: "Read chapter 5",
    completed: false,
    priority: "low",
    dueDate: "Friday",
  },
  {
    id: 5,
    title: "Group project meeting",
    completed: false,
    priority: "medium",
    dueDate: "3 PM",
  },
];
