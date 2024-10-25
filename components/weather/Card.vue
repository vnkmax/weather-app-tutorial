<script setup lang="ts">
defineProps({
  dateTimeString: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 p-4 font-semibold"
  >
    <span class="text-lg">{{ dateTimeString }}</span>
    <Icon class="h-16" :icon-name="icon" />
    <div class="flex flex-col text-center">
      <span class="font-normal">{{ weather }}</span>
      <span class="text-xl">{{ temperature }}&deg;C</span>
    </div>
  </div>
</template>
