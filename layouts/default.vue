<template>
  <div
    class="from-background-from to-background-to flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 text-white text-opacity-80"
  >
    <div class="container mx-auto flex flex-col gap-8">
      <AppHeader />
      <slot />
    </div>
  </div>
</template>
