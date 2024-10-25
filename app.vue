<template>
  <NuxtLayout>
    <div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-6">
      <WeatherNow class="lg:col-span-3 xl:col-span-2" />
      <WeatherHourly class="lg:col-span-3 xl:col-span-4" />
    </div>

    <WeatherDaily />
  </NuxtLayout>
</template>
