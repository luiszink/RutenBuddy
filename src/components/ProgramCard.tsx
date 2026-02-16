import { ProgramItem } from '../types';
import { useApp } from '../contexts/AppContext';

interface ProgramCardProps {
  item: ProgramItem;
}

export default function ProgramCard({ item }: ProgramCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(item.id);

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📍 {item.location}
          </p>
        </div>
        <button
          onClick={() => toggleFavorite(item.id)}
          className="ml-2 text-2xl transition-transform hover:scale-110"
          aria-label="Toggle favorite"
        >
          {favorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
        <span>🕐 {item.startTime} - {item.endTime}</span>
      </div>

      {item.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {item.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
