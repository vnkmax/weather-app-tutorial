<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold">Now</h2>

    <UiGlassContainer
      class="flex flex-1 items-center justify-evenly gap-4 !py-12"
    >
      <div class="flex flex-col gap-8">
        <span class="text-3xl font-medium">Jēkabpils</span>

        <div class="flex items-end gap-2">
          <span class="text-5xl font-medium">21&deg;C</span>
          <span class="text-xl font-medium">Sunny</span>
        </div>
      </div>

      <Icon class="h-auto w-32" icon-name="sun" />
    </UiGlassContainer>
  </div>
</template>
