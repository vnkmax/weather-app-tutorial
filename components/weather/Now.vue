<script setup lang="ts">
const { useCurrentLocation } = useLocation();
const { getForecast, getConditionsIcon } = useWeather();
const currentLocation: Ref<any | null> = useCurrentLocation();
const currentWeather: Ref<WeatherObject | undefined> = ref();

// Watch for current location and update weather if it changes.
watch(currentLocation, async () => {
  if (currentLocation.value) {
    currentWeather.value = (await getForecast()) as WeatherObject;
  }
});

/**
 * Handle icon name selection based on conditions.
 */
const handleConditionsIcon = () => {
  if (currentWeather.value) {
    return getConditionsIcon(
      currentWeather.value.isDay,
      currentWeather.value.weatherCode,
    );
  }

  return "";
};
</script>

<template>
  <transition name="fade" appear>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Now</h2>

      <UiGlassContainer
        class="flex flex-1 items-center justify-evenly gap-4 !py-12"
      >
        <div
          v-if="currentWeather && currentLocation"
          class="flex flex-col gap-8"
        >
          <span class="text-3xl font-medium">{{ currentLocation.name }}</span>

          <div class="flex items-end gap-2">
            <span class="text-5xl font-medium">
              {{ currentWeather.temperature }}
            </span>
            <span class="text-xl font-medium">
              {{ currentWeather.weatherCodeString }}
            </span>
          </div>
        </div>

        <Icon class="h-auto w-32" :icon-name="handleConditionsIcon()" />
      </UiGlassContainer>
    </div>
  </transition>
</template>
