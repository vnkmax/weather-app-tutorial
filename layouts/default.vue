<script setup lang="ts">
const { useCurrentLocation } = useLocation();
const currentLocation: Ref<LocationObject | null> = useCurrentLocation();
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background-from to-background-to p-4 text-white text-opacity-80"
  >
    <div class="container mx-auto flex flex-col gap-8">
      <transition name="fade" appear>
        <AppHeader />
      </transition>

      <transition name="fade" appear>
        <div v-show="currentLocation?.id" class="flex flex-1 flex-col gap-8">
          <slot />
        </div>
      </transition>

      <transition name="fade" appear>
        <UiGlassContainer
          v-show="!currentLocation?.id"
          class="flex w-full max-w-md flex-col items-center justify-center"
        >
          <LocationSearch class="mx-auto w-full max-w-md" />
        </UiGlassContainer>
      </transition>
    </div>
  </div>
</template>
