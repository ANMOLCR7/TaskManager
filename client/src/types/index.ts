export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'shopping' | 'health' | 'other';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: 'personal' | 'work' | 'shopping' | 'health' | 'other';
  dueDate?: string | null;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: 'personal' | 'work' | 'shopping' | 'health' | 'other';
  dueDate?: string | null;
}

export interface TaskFilters {
  search: string;
  category: string;
  priority: string;
  completed: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
} 