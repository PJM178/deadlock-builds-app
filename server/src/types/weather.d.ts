export interface Cities {
  id: number;
  name: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface WeatherConditions {
  id: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  city_id: number;
  recorded_at: number;
  temperature: number;
  feels_like: number;
  wind_speed: number;
  condition_id: number;
}