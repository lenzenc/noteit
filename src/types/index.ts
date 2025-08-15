export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  category?: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type?: 'task' | 'meeting' | 'reminder';
}