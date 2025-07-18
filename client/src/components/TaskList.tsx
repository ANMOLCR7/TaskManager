import React from 'react';
import { Task } from '../types';
import { format } from 'date-fns';
import { Edit, Trash2, Calendar, CheckCircle, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="badge-high">High</span>;
      case 'medium':
        return <span className="badge-medium">Medium</span>;
      case 'low':
        return <span className="badge-low">Low</span>;
      default:
        return <span className="badge-medium">Medium</span>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'shopping':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <CheckCircle className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`card transition-all duration-200 hover:shadow-md ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Checkbox */}
              <button
                onClick={() => onToggleComplete(task.id, !task.completed)}
                className="mt-1"
              >
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-lg font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center space-x-2 ml-4">
                    {getPriorityBadge(task.priority)}
                    <span className={`badge ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                </div>

                {task.description && (
                  <p
                    className={`text-gray-600 mb-3 ${
                      task.completed ? 'line-through' : ''
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                {/* Due Date */}
                {task.dueDate && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    <span
                      className={`${
                        isOverdue(task.dueDate) && !task.completed
                          ? 'text-red-600 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      {isOverdue(task.dueDate) && !task.completed && ' (Overdue)'}
                    </span>
                  </div>
                )}

                {/* Created Date */}
                <div className="text-xs text-gray-400 mt-2">
                  Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Edit task"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 