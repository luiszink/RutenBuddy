import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

export default function Home() {
  const features = [
    {
      title: 'Programm',
      description: 'Entdecke alle Events nach Tag und Uhrzeit',
      icon: '📅',
      path: '/program',
      color: 'bg-blue-500',
    },
    {
      title: 'Favoriten',
      description: 'Deine gespeicherten Highlights',
      icon: '⭐',
      path: '/favorites',
      color: 'bg-yellow-500',
    },
    {
      title: 'Orte',
      description: 'Finde alle wichtigen Treffpunkte',
      icon: '📍',
      path: '/places',
      color: 'bg-red-500',
    },
  ];

  return (
    <PageContainer title="RutenBuddy">
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Willkommen beim Heimatfest!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Dein digitaler Begleiter für unvergessliche Momente
          </p>
        </div>

        <div className="grid gap-4">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="card hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-2xl">›</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Offline verfügbar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Diese App funktioniert auch ohne Internetverbindung. Alle Programmdaten sind lokal gespeichert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
