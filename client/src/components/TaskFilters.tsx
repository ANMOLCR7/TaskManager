import React from 'react';
import { TaskFilters } from '../types';
import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleChange = (field: keyof TaskFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="input"
          >
            <option value="">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <select
            value={filters.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="input"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Completion Filter */}
        <div>
          <select
            value={filters.completed}
            onChange={(e) => handleChange('completed', e.target.value)}
            className="input"
          >
            <option value="">All Tasks</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.category || filters.priority || filters.completed) && (
        <div className="mt-4">
          <button
            onClick={() => onFiltersChange({ search: '', category: '', priority: '', completed: '' })}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFiltersComponent; 