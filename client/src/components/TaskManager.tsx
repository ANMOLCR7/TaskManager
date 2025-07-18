import React, { useState, useEffect } from 'react';
import { Task, TaskFilters } from '../types';
import { apiService } from '../services/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFiltersComponent from './TaskFilters';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    category: '',
    priority: '',
    completed: '',
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiService.getTasks();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTasks(response.data);
    }
    
    setLoading(false);
  };

  const handleCreateTask = async (taskData: any) => {
    const response = await apiService.createTask(taskData);
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTasks(prev => [response.data!, ...prev]);
      setShowForm(false);
    }
  };

  const handleUpdateTask = async (id: string, taskData: any) => {
    const response = await apiService.updateTask(id, taskData);
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data! : task
      ));
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const response = await apiService.deleteTask(id);
    
    if (response.error) {
      setError(response.error);
    } else {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const response = await apiService.toggleTaskCompletion(id, completed);
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data! : task
      ));
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || task.category === filters.category;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesCompleted = filters.completed === '' || 
                           (filters.completed === 'true' && task.completed) ||
                           (filters.completed === 'false' && !task.completed);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompleted;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskManager</h1>
        <p className="text-gray-600">Organize your life, one task at a time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Filters */}
      <TaskFiltersComponent filters={filters} onFiltersChange={setFilters} />

      {/* Add Task Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="mb-6">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Edit Task Form */}
      {editingTask && (
        <div className="mb-6">
          <TaskForm
            task={editingTask}
            onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
            onCancel={() => setEditingTask(null)}
          />
        </div>
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager; 