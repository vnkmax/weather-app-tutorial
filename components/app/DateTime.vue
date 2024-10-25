<script setup lang="ts">
const dateTime: Ref<string> = ref("");

/**
 * Update date and time values.
 */
const updateDateAndTime = (): void => {
  const now = new Date();
  dateTime.value = now.toLocaleString();
};

// Immediately update the date and time.
updateDateAndTime();

// Set an interval to update date and time every second.
setInterval(updateDateAndTime, 1000);
</script>

<template>
  <div class="flex flex-col text-right text-sm md:text-base">
    <span>{{ dateTime }}</span>
  </div>
</template>
