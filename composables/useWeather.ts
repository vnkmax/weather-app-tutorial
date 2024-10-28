import weatherConditionMap from '~/misc/weather-condition-map'

/**
 * Weather Composable
 */
export default () => {
    // Define request URL for fetching weather data (Open Meteo).
    const requestUrl: string = 'https://api.open-meteo.com/v1/forecast'

    // Get and define current location from location composable.
    const { useCurrentLocation } = useLocation()
    const currentLocation: Ref<LocationObject | null> = useCurrentLocation()

    /**
     * Helper function to create request params based on forecast type.
     *
     * @param type ForecastType
     *
     * @returns WeatherRequestParams
     */
    const createRequestParams = (
        type: ForecastType
    ): WeatherRequestParams => {
        const params: WeatherRequestParams = {
            latitude: currentLocation.value?.latitude,
            longitude: currentLocation.value?.longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timeformat: 'unixtime',
        }

        switch (type) {
            case 'daily':
                params.forecast_days = 8
                params.daily = ['temperature_2m_max', 'weather_code']
                break
            case 'hourly':
                params.forecast_days = 2
                params.hourly = ['is_day', 'temperature_2m', 'weather_code']
                break
            default:
                params.current = ['is_day', 'temperature_2m', 'weather_code']
                break
        }

        return params
    }

    /**
     * Get forecast based on type of the forecast:
     * - 'current' for current weather conditions (default);
     * - 'daily' for daily weather forecast;
     * - 'hourly' for hourly weather forecast.
     * 
     * @param type ForecastType
     *
     * @returns Promise<WeatherObject | WeatherObject[] | undefined>
     */
    const getForecast = async (
        type: ForecastType = 'current'
    ): Promise<WeatherObject | WeatherObject[] | undefined> => {
        if (!currentLocation.value) return

        try {
            const weatherData: any = await $fetch(requestUrl, {
                method: 'GET',
                params: createRequestParams(type),
            })

            if (type === 'current') {
                const temperature = Math.round(weatherData.current.temperature_2m) +
                    weatherData.current_units.temperature_2m

                return {
                    weatherCodeString: weatherConditionMap[weatherData.current.weather_code],
                    weatherCode: weatherData.current.weather_code,
                    temperature,
                    isDay: weatherData.current.is_day === 1,
                }
            }

            return prepareForecastArray(
                weatherData[type],
                weatherData[`${type}_units`],
                type,
            )
        } catch (error) {
            console.error('Error fetching weather:', error)

            return
        }
    }

    /**
     * Helper function to get formatted temperature string.
     *
     * @param forecastData ForecastData
     * @param units Units
     * @param type ForecastType
     * @param index number
     *
     * @returns string
     */
    const getTemperature = (
        forecastData: ForecastData,
        units: Units,
        type: ForecastType,
        index: number
    ): string => {
        const temp = type === 'daily'
            ? forecastData.temperature_2m_max![index]
            : forecastData.temperature_2m![index]

        const unit = type === 'daily'
            ? units.temperature_2m_max
            : units.temperature_2m

        return `${Math.round(temp)}${unit}`
    }

    /**
     * Helper function to get formatted date-time string.
     *
     * @param timestamp number
     * @param type ForecastType
     *
     * @returns string
     */
    const getDateTimeString = (timestamp: number, type: ForecastType): string => {
        const date = new Date(timestamp * 1000)

        return type === 'hourly'
            ? date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
            : date.toLocaleDateString()
    };

    /**
     * Prepare forecast array.
     *
     * @param forecastData ForecastData
     * @param units Units
     * @param type ForecastType
     * 
     * @returns WeatherObject[] | undefined
     */
    const prepareForecastArray = (
        forecastData: ForecastData,
        units: Units,
        type: ForecastType
    ): WeatherObject[] | undefined => {
        const maxFutureEntries = type === 'hourly' ? 6 : 7
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const forecastArray: WeatherObject[] = []
        let futureEntries = 0

        for (let i = 0; i < forecastData.time.length && futureEntries < maxFutureEntries; i++) {
            if (forecastData.time[i] > currentTimestamp) {
                const temperature = getTemperature(forecastData, units, type, i)
                const dateTimeString = getDateTimeString(forecastData.time[i], type)

                forecastArray.push({
                    weatherCodeString: weatherConditionMap[forecastData.weather_code[i]],
                    weatherCode: forecastData.weather_code[i],
                    temperature,
                    dateTimeString,
                    isDay: type === 'daily' ? true : forecastData.is_day![i] === 1,
                })

                futureEntries++
            }
        }

        return forecastArray.length ? forecastArray : undefined
    }

    /**
     * Helper function to icon for conditions based on weather code.
     *
     * @param isDay boolean
     * @param weatherCode number
     *
     * @returns string
     */
    const getConditionsIcon = (isDay: boolean, weatherCode: number): string => {
        // Clear sky
        if (weatherCode === 0 && isDay) return 'sun'
        if (weatherCode === 0 && !isDay) return 'moon'

        // Mostly clear, partly cloudy
        if ([1, 2].includes(weatherCode) && isDay) return 'cloudSun'
        if ([1, 2].includes(weatherCode) && !isDay) return 'cloudMoon'

        // Overcast
        if (weatherCode === 3) return 'clouds'

        // Fog
        if ([45, 48].includes(weatherCode) && isDay) return 'sunFog'
        if ([45, 48].includes(weatherCode) && !isDay) return 'moonFog'

        // Rain & Drizzle
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) return 'cloudRain'

        // Snow
        if ([71, 73, 75, 77].includes(weatherCode)) return 'cloudSnow'

        // Thunderstorm & Rain
        if ([95, 96].includes(weatherCode)) return 'cloudBolt'
        if (weatherCode === 99) return 'cloudStorm'

        return ''
    }

    return {
        getForecast,
        getConditionsIcon,
    }
}