<script setup lang="ts">
defineProps({
  dateTimeString: {
    type: String as PropType<string | undefined>,
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
    type: String as PropType<string | undefined>,
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
      <span class="text-xl">{{ temperature }}</span>
    </div>
  </div>
</template>
