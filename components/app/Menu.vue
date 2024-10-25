<script setup lang="ts">
const showMenu: Ref<boolean> = ref(false);
</script>

<template>
  <div class="select-none">
    <!-- Menu Toggle -->
    <Icon
      class="transition-colors duration-300 hover:cursor-pointer hover:text-white"
      :class="showMenu ? 'text-white' : ''"
      icon-name="menu"
      @click="showMenu = !showMenu"
    />

    <!-- Menu Content -->
    <transition name="fade" appear>
      <UiGlassContainer
        v-if="showMenu"
        class="absolute right-0 top-full mt-4 flex w-full max-w-md flex-col gap-8 backdrop-blur-2xl"
      >
        <!-- Current Location -->
        <div class="flex flex-col gap-2 tracking-wide">
          <span class="text-lg font-bold">Current Location</span>
          <div class="flex items-center gap-2">
            <Icon class="w-6" icon-name="mapPoint" />
            <span>Jēkabpils, Jēkabpils novads, Latvia</span>
          </div>
          <div class="ml-8 text-xs font-medium opacity-75">
            <span>Lat: 56.4958638</span>
            &nbsp;
            <span>Lon: 25.8687747</span>
          </div>
        </div>

        <!-- Location Search Box -->
        <LocationSearch />
      </UiGlassContainer>
    </transition>
  </div>
</template>
