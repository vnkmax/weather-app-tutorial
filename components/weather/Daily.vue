<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold">Daily</h2>
    <div class="flex flex-col overflow-x-auto shadow-xl">
      <UiGlassContainer class="grid min-w-max flex-1 grid-cols-7">
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="25 Oct 2024"
          icon="sun"
          weather="Sunny"
          :temperature="21"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="26 Oct 2024"
          icon="cloudSun"
          weather="Mostly sunny"
          :temperature="20"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="27 Oct 2024"
          icon="clouds"
          weather="Cloudy"
          :temperature="18"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="28 Oct 2024"
          icon="cloudRain"
          weather="Rain"
          :temperature="15"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="29 Oct 2024"
          icon="cloudBolt"
          weather="Thunder"
          :temperature="25"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="30 Oct 2024"
          icon="cloudStorm"
          weather="Thunderstorm"
          :temperature="24"
        />
        <WeatherCard
          class="border-white border-opacity-5 even:border-x"
          date-time-string="31 Oct 2024"
          icon="cloudSnow"
          weather="Snow"
          :temperature="-21"
        />
      </UiGlassContainer>
    </div>
  </div>
</template>
