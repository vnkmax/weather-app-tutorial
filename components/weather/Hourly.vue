<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold">Hourly</h2>
    <div class="flex flex-col overflow-x-auto shadow-xl">
      <UiGlassContainer class="grid min-w-max flex-1 grid-cols-6">
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="12 AM"
          icon="moon"
          weather="Clear"
          :temperature="18"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="1 AM"
          icon="moon"
          weather="Clear"
          :temperature="17"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="2 AM"
          icon="moon"
          weather="Clear"
          :temperature="16"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="3 AM"
          icon="cloudMoon"
          weather="Mostly cloudy"
          :temperature="15"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="4 AM"
          icon="clouds"
          weather="Cloudy"
          :temperature="14"
        />
        <WeatherCard
          class="border-white border-opacity-5 last:!border-r-0 even:border-x"
          date-time-string="5 AM"
          icon="cloudRain"
          weather="Rain"
          :temperature="14"
        />
      </UiGlassContainer>
    </div>
  </div>
</template>
