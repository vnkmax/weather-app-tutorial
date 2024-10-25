<template>
  <UiGlassContainer class="relative flex justify-between">
    <!-- Logo -->
    <AppLogo />

    <div class="flex flex-1 items-center justify-end gap-4">
      <!-- Date and Time -->
      <ClientOnly>
        <AppDateTime />
      </ClientOnly>

      <!-- Menu -->
      <AppMenu />
    </div>
  </UiGlassContainer>
</template>
