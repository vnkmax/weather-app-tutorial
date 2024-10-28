<script setup lang="ts">
const { useCurrentLocation, searchLocation } = useLocation();
const currentLocation: Ref<LocationObject | null> = useCurrentLocation();
const results: Ref<LocationObject[]> = ref([]);
const showResults: Ref<boolean> = ref(false);
const keyUpTimeout: Ref<NodeJS.Timeout | null> = ref(null);
const searchInput: Ref<HTMLInputElement | null> = ref(null);

/**
 * Handle input change.
 */
const handleInputChange = async (event: Event): Promise<void> => {
  const input: HTMLInputElement = event.target as HTMLInputElement;

  // Clear the timeout if it exists to avoid multiple simultaneous API calls.
  if (keyUpTimeout.value) clearTimeout(keyUpTimeout.value);

  // Hide results if input has no value.
  if (!input.value) {
    keyUpTimeout.value = setTimeout(() => {
      showResults.value = false;
    }, 500);

    return;
  }

  // Fetch and show results.
  keyUpTimeout.value = setTimeout(async () => {
    results.value = await searchLocation(input.value);
    showResults.value = true;
  }, 500);
};

/**
 * Handle location selection.
 */
const handleSelectLocation = (location: LocationObject): void => {
  currentLocation.value = location;
  results.value = [];
  showResults.value = false;

  if (searchInput.value) searchInput.value.value = "";
};
</script>

<template>
  <div
    class="flex flex-col gap-2 overflow-hidden tracking-wide transition-all duration-300"
    :class="showResults ? 'h-72' : 'h-24'"
  >
    <!-- Location Search Input -->
    <label for="search" class="text-lg font-bold">Search Location</label>
    <div class="relative w-full">
      <input
        class="w-full bg-white bg-opacity-5 p-4 shadow transition-colors duration-300 placeholder:text-white placeholder:text-opacity-75 focus:bg-opacity-5 focus:outline-none focus:ring-0"
        id="search"
        name="search"
        placeholder="Enter location name or address"
        type="text"
        autocomplete="off"
        ref="searchInput"
        @keyup.prevent="handleInputChange"
      />
      <Icon
        class="absolute bottom-0 right-4 top-0 my-auto w-8 opacity-75"
        icon-name="magnifier"
      />
    </div>

    <!-- Results Container -->
    <transition name="fade" appear>
      <div v-show="showResults" class="h-full" :key="results.length">
        <transition name="fade" appear>
          <div v-if="results.length > 0" class="flex flex-col gap-2">
            <template v-for="location in results" :key="location.id">
              <span
                class="truncate bg-white bg-opacity-10 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-opacity-15"
                @click="handleSelectLocation(location)"
              >
                {{ location.displayName }}
              </span>
            </template>
          </div>
        </transition>

        <transition name="fade" appear>
          <div
            v-if="!results.length"
            class="flex h-full items-center justify-center"
          >
            <p class="text-lg font-bold">No results found.</p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
