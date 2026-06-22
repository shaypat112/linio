// linio/mobile/app/data/features.ts

export interface Feature {
  id: string;
  icon: string; // Ionicons name
  title: string;
  description: string;
  color: string;
}

export const features: Feature[] = [
  {
    id: "1",
    icon: "school-outline",
    title: "Smart Assignment Tracking",
    description:
      "Automatically syncs assignments from Google Classroom, Canvas, and Gmail",
    color: "#4A90E2",
  },
  {
    id: "2",
    icon: "calendar-outline",
    title: "Unified Calendar View",
    description: "See all your deadlines, classes, and events in one place",
    color: "#FF6B6B",
  },
  {
    id: "3",
    icon: "rocket-outline",
    title: "AI Study Plans",
    description: "Get personalized study schedules based on your workload",
    color: "#4CAF50",
  },
  {
    id: "4",
    icon: "checkmark-circle-outline",
    title: "Todo & Progress Tracking",
    description: "Manage tasks and track your academic progress effortlessly",
    color: "#FFB347",
  },
];
