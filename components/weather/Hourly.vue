<script setup lang="ts">
const { useCurrentLocation } = useLocation();
const { getForecast, getConditionsIcon } = useWeather();
const currentLocation: Ref<any | null> = useCurrentLocation();
const hourlyForecast: Ref<WeatherObject[] | undefined> = ref();

// Watch for current location and update weather if it changes.
watch(currentLocation, async () => {
  if (currentLocation.value) {
    hourlyForecast.value = (await getForecast("hourly")) as WeatherObject[];
  }
});

/**
 * Handle icon name selection based on conditions.
 */
const handleConditionsIcon = (weatherData: WeatherObject) => {
  if (weatherData) {
    return getConditionsIcon(weatherData.isDay, weatherData.weatherCode);
  }

  return "";
};
</script>

<template>
  <transition name="fade" appear>
    <div class="flex h-full flex-col gap-4">
      <h2 class="text-2xl font-bold">Hourly</h2>
      <div class="flex h-full flex-col overflow-x-auto shadow-xl">
        <UiGlassContainer class="grid min-w-max flex-1 grid-cols-6">
          <template v-for="(weatherData, index) in hourlyForecast" :key="index">
            <transition name="fade" appear>
              <WeatherCard
                class="border-white border-opacity-5 last:!border-r-0 even:border-x"
                :class="`delay-${index + 1 * 300}`"
                :date-time-string="weatherData.dateTimeString"
                :icon="handleConditionsIcon(weatherData)"
                :weather="weatherData.weatherCodeString"
                :temperature="weatherData.temperature"
              />
            </transition>
          </template>
        </UiGlassContainer>
      </div>
    </div>
  </transition>
</template>
