# RutenBuddy - Heimatfest Planer PWA

Eine Progressive Web App (PWA) zur Planung und Navigation eines Heimatfests. Mobile-first, offline-fähig und installierbar.

## Features

- ✅ **PWA**: Vollständig installierbar auf Mobile & Desktop
- ✅ **Offline-First**: Funktioniert ohne Internetverbindung
- ✅ **Programm**: Filterbares Event-Programm mit Suche
- ✅ **Favoriten**: Events als Favoriten markieren (LocalStorage)
- ✅ **Orte**: Treffpunkte mit Google Maps Integration
- ✅ **Dark Mode**: Umschaltbar zwischen Hell/Dunkel
- ✅ **TypeScript**: Vollständig typisiert, keine Any-Types
- ✅ **Responsive**: Mobile-first Design mit TailwindCSS

## Tech Stack

- **Vite** - Build Tool & Dev Server
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **React Router** - Client-side Routing
- **TailwindCSS** - Utility-first CSS
- **vite-plugin-pwa** - PWA Manifest & Service Worker
- **Context API** - State Management
- **LocalStorage** - Client-side Persistence

## Installation & Start

```bash
# Dependencies installieren
npm install

# Development Server starten (http://localhost:5173)
npm run dev

# Production Build erstellen
npm run build

# Production Build lokal testen
npm run preview

# Code Linting
npm run lint
```

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── BottomNav.tsx
│   ├── PageContainer.tsx
│   ├── ProgramCard.tsx
│   └── PlaceCard.tsx
├── contexts/         # React Context für State Management
│   └── AppContext.tsx
├── data/            # JSON Datendateien
│   ├── program.json
│   └── places.json
├── pages/           # Seiten-Komponenten (Routes)
│   ├── Home.tsx
│   ├── Program.tsx
│   ├── Favorites.tsx
│   ├── Places.tsx
│   └── Settings.tsx
├── types/           # TypeScript Type Definitionen
│   └── index.ts
├── App.tsx          # Haupt-App mit Routing
├── main.tsx         # Entry Point
└── index.css        # Global Styles & Tailwind
```

## PWA Installation

Nach dem ersten Build (`npm run build`) kann die App als PWA installiert werden:

- **Chrome/Edge**: "Install App" Button in der Adressleiste
- **Safari iOS**: "Zum Home-Bildschirm" im Share-Menü
- **Android**: "Zum Startbildschirm hinzufügen"

## Daten anpassen

### Programm-Events

Bearbeite `src/data/program.json`:

```json
{
  "id": "1",
  "title": "Event Titel",
  "location": "Ort",
  "day": "Freitag",
  "startTime": "18:00",
  "endTime": "19:00",
  "tags": ["Tag1", "Tag2"],
  "description": "Beschreibung"
}
```

### Orte/Treffpunkte

Bearbeite `src/data/places.json`:

```json
{
  "id": "1",
  "name": "Ort Name",
  "description": "Beschreibung",
  "lat": 51.5074,
  "lng": -0.1278,
  "category": "Kategorie"
}
```

## Icons ersetzen

Die Platzhalter-Icons im `public/` Ordner sollten durch echte PNG-Icons ersetzt werden:

- `icon-192x192.png` (192x192px)
- `icon-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

Empfohlenes Tool: [RealFaviconGenerator](https://realfavicongenerator.net/)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

## Lizenz

MIT
