export interface ProgramItem {
  id: string;
  title: string;
  location: string;
  day: string;
  startTime: string;
  endTime: string;
  tags: string[];
  description?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: string;
}

export interface AppSettings {
  darkMode: boolean;
}
