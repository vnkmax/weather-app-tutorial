/**
 * Location Composable
 */
export default () => {
    const useCurrentLocation = (): Ref<LocationObject | null> => useState('currentLocation', () => null)

    // Define request URL and constants for fetching location based on lat., lon. (Nominatim).
    const requestUrl: string = 'https://nominatim.openstreetmap.org/search'
    const MAX_RESULTS = 3
    const LANGUAGE = 'en-US'

    /**
     * Search for locations.
     *
     * @param location string
     *
     * @returns Promise<LocationObject[]>
     */
    const searchLocation = async (location: string): Promise<LocationObject[]> => {
        const locations: LocationObject[] = []

        try {
            const locationDataArray: LocationData[] = await $fetch(requestUrl, {
                method: 'GET',
                params: {
                    q: location,
                    format: 'json',
                    limit: MAX_RESULTS,
                    'accept-language': LANGUAGE
                }
            })

            for (const locationData of locationDataArray) {
                locations.push({
                    id: locationData.place_id,
                    name: locationData.name,
                    displayName: locationData.display_name,
                    latitude: locationData.lat,
                    longitude: locationData.lon
                })
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }

        return locations

    }

    return {
        useCurrentLocation,
        searchLocation
    }
}
