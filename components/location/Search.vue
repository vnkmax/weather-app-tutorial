<script setup lang="ts">
const showResults: Ref<boolean> = ref(false);
const keyUpTimeout: Ref<NodeJS.Timeout | null> = ref(null);

/**
 * Handle input change.
 */
const handleInputChange = (event: Event): void => {
  const input: HTMLInputElement = event.target as HTMLInputElement;

  // Clear the timeout if it exists.
  if (keyUpTimeout.value) clearTimeout(keyUpTimeout.value);

  // Hide results if input has no value.
  if (!input.value) {
    keyUpTimeout.value = setTimeout(() => {
      showResults.value = false;
    }, 500);

    return;
  }

  // Show results after a delay.
  keyUpTimeout.value = setTimeout(() => {
    showResults.value = true;
  }, 500);
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
        @keyup.prevent="handleInputChange"
      />
      <Icon
        class="absolute bottom-0 right-4 top-0 my-auto w-8 opacity-75"
        icon-name="magnifier"
      />
    </div>

    <!-- Results Container -->
    <transition name="fade" appear>
      <div v-show="showResults" class="flex flex-col gap-2">
        <span
          class="truncate bg-white bg-opacity-10 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-opacity-15"
        >
          Jēkabpils, Jēkabpils novads, Latvia
        </span>
        <span
          class="truncate bg-white bg-opacity-10 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-opacity-15"
        >
          Jēkabpils, Jēkabpils novads, Latvia
        </span>
        <span
          class="truncate bg-white bg-opacity-10 p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-opacity-15"
        >
          Jēkabpils, Jēkabpils novads, Latvia
        </span>
      </div>
    </transition>
  </div>
</template>
