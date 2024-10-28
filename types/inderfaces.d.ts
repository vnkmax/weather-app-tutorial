// Define interface for weather request parameters.
interface WeatherRequestParams {
    latitude?: number;
    longitude?: number;
    timezone?: string;
    timeformat?: string;
    forecast_days?: number;
    daily?: string[];
    hourly?: string[];
    current?: string[];
}

// Define interface for weather object.
interface WeatherObject {
    isDay: boolean
    temperature: string,
    weatherCode: number,
    weatherCodeString: string,
    dateTimeString?: string | undefined
}

// Define interface for units.
interface Units {
    temperature_2m_max: string;
    temperature_2m: string;
}

// Define interface for forecast data.
interface ForecastData {
    time: number[];
    temperature_2m_max: number[];
    temperature_2m: number[];
    weather_code: number[];
    is_day: number[];
}

// Define interface for location object.
interface LocationObject {
    id: number,
    name: string,
    displayName: string,
    latitude: number,
    longitude: number,
}

// Define interface for location data.
interface LocationData {
    place_id: number,
    name: string,
    display_name: string,
    lat: number,
    lon: number
}
