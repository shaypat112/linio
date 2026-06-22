// linio/mobile/app/data/integrations.ts

export interface Integration {
  id: string;
  name: string;
  icon: string; // Ionicons name
  description: string;
  color: string;
  status: "connected" | "disconnected" | "connecting";
  comingSoon?: boolean;
}

export const integrations: Integration[] = [
  {
    id: "canvas",
    name: "Canvas",
    icon: "book-outline",
    description: "Sync assignments, grades, and course materials",
    color: "#E7242A",
    status: "disconnected",
  },
  {
    id: "google-classroom",
    name: "Google Classroom",
    icon: "school-outline",
    description: "Import assignments, announcements, and classwork",
    color: "#34A853",
    status: "disconnected",
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: "mail-outline",
    description: "Track assignment emails and notifications",
    color: "#EA4335",
    status: "disconnected",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    icon: "calendar-outline",
    description: "Sync deadlines, events, and your schedule",
    color: "#4285F4",
    status: "disconnected",
  },
];
