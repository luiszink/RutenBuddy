import { useState, useMemo } from 'react';
import PageContainer from '../components/PageContainer';
import PlaceCard from '../components/PlaceCard';
import placesData from '../data/places.json';
import { Place } from '../types';

export default function Places() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const places = placesData as Place[];

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(places.map((place) => place.category)));
    return uniqueCategories.sort();
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'all') return places;
    return places.filter((place) => place.category === selectedCategory);
  }, [places, selectedCategory]);

  return (
    <PageContainer title="Orte & Treffpunkte">
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Alle Kategorien
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-2 block">📍</span>
            <p className="text-gray-600 dark:text-gray-400">
              Keine Orte in dieser Kategorie gefunden.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
