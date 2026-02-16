import PageContainer from '../components/PageContainer';
import { useApp } from '../contexts/AppContext';

export default function Settings() {
  const { settings, updateSettings, resetData, favorites } = useApp();

  const handleToggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const handleReset = () => {
    if (confirm('Möchtest du wirklich alle Daten zurücksetzen? Alle Favoriten gehen verloren.')) {
      resetData();
      alert('Daten wurden zurückgesetzt.');
    }
  };

  return (
    <PageContainer title="Einstellungen">
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Darstellung
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dunkles Farbschema aktivieren
              </p>
            </div>
            <button
              onClick={handleToggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Daten & Speicher
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Favoriten</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {favorites.length} Event{favorites.length !== 1 && 's'} gespeichert
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Alle Daten zurücksetzen
            </button>
          </div>
        </div>

        <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ℹ️ App-Info
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>PWA:</strong> Installierbar & Offline-fähig</p>
            <p><strong>Speicher:</strong> LocalStorage (lokal im Browser)</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            💡 Über diese App
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            RutenBuddy ist dein digitaler Begleiter für das Heimatfest. 
            Die App funktioniert komplett offline und speichert deine Favoriten 
            lokal auf deinem Gerät.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
