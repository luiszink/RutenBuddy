import { useMemo } from 'react';
import PageContainer from '../components/PageContainer';
import ProgramCard from '../components/ProgramCard';
import { useApp } from '../contexts/AppContext';
import programData from '../data/program.json';
import { ProgramItem } from '../types';

export default function Favorites() {
  const { favorites } = useApp();
  const program = programData as ProgramItem[];

  const favoriteItems = useMemo(() => {
    return program.filter((item) => favorites.includes(item.id));
  }, [program, favorites]);

  const groupedByDay = useMemo(() => {
    const groups: Record<string, ProgramItem[]> = {};
    favoriteItems.forEach((item) => {
      if (!groups[item.day]) {
        groups[item.day] = [];
      }
      groups[item.day].push(item);
    });

    Object.keys(groups).forEach((day) => {
      groups[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return groups;
  }, [favoriteItems]);

  return (
    <PageContainer title="Favoriten">
      <div className="space-y-4">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">⭐</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Noch keine Favoriten
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Markiere Events im Programm mit einem Stern, um sie hier zu speichern.
            </p>
          </div>
        ) : (
          <>
            <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ⭐ Du hast <strong>{favoriteItems.length}</strong> Event{favoriteItems.length !== 1 && 's'} als Favorit markiert
              </p>
            </div>

            {Object.keys(groupedByDay)
              .sort()
              .map((day) => (
                <div key={day} className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sticky top-16 bg-gray-50 dark:bg-gray-900 py-2 z-5">
                    📅 {day}
                  </h2>
                  {groupedByDay[day].map((item) => (
                    <ProgramCard key={item.id} item={item} />
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </PageContainer>
  );
}
