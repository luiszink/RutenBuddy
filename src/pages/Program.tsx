import { useState, useMemo } from 'react';
import PageContainer from '../components/PageContainer';
import ProgramCard from '../components/ProgramCard';
import programData from '../data/program.json';
import { ProgramItem } from '../types';

export default function Program() {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const program = programData as ProgramItem[];

  const days = useMemo(() => {
    const uniqueDays = Array.from(new Set(program.map((item) => item.day)));
    return uniqueDays.sort();
  }, [program]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    program.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [program]);

  const filteredProgram = useMemo(() => {
    return program.filter((item) => {
      const matchesDay = selectedDay === 'all' || item.day === selectedDay;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);

      return matchesDay && matchesSearch && matchesTag;
    });
  }, [program, selectedDay, searchQuery, selectedTag]);

  const groupedByDay = useMemo(() => {
    const groups: Record<string, ProgramItem[]> = {};
    filteredProgram.forEach((item) => {
      if (!groups[item.day]) {
        groups[item.day] = [];
      }
      groups[item.day].push(item);
    });

    Object.keys(groups).forEach((day) => {
      groups[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return groups;
  }, [filteredProgram]);

  return (
    <PageContainer title="Programm">
      <div className="space-y-4">
        <div className="card">
          <input
            type="text"
            placeholder="🔍 Suche nach Event oder Ort..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedDay === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Alle Tage
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedTag === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Alle Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {Object.keys(groupedByDay).length === 0 ? (
          <div className="text-center py-12">
            <span className="text-4xl mb-2 block">🔍</span>
            <p className="text-gray-600 dark:text-gray-400">
              Keine Events gefunden. Versuche einen anderen Filter.
            </p>
          </div>
        ) : (
          Object.keys(groupedByDay)
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
            ))
        )}
      </div>
    </PageContainer>
  );
}
