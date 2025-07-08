<template>
  <div :class="['weather-app', weatherClass]">
    <div class="container">
      <h1>天氣查詢</h1>

      <select v-model="selectedCity" @change="fetchWeather">
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>

      <div v-if="weatherData" class="weather-info">
        <img :src="weatherIcon" alt="Weather Icon" class="weather-icon" />
        <p><strong>天氣現象：</strong>{{ weatherData.weather }}</p>
        <p><strong>最高溫度：</strong>{{ weatherData.maxT }} °C</p>
        <p><strong>最低溫度：</strong>{{ weatherData.minT }} °C</p>
        <p><strong>降雨機率：</strong>{{ weatherData.pop }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

//const apiKey = '你的API_KEY' // <<--- 請替換為你註冊的 CWA API Key
const apiKey = 'CWA-290D12F1-3FA3-4A61-B613-623327DD04C2' // <<--- 請替換為你註冊的 CWA API Key

const cities = ref([])
const selectedCity = ref('')
const weatherData = ref(null)
const weatherClass = ref('')
const weatherIcon = ref('')

// 取得城市清單
const fetchCities = async () => {
  const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()
  cities.value = data.records.location.map(loc => loc.locationName)
  selectedCity.value = cities.value[0]
}

// 根據縣市抓取天氣資訊
const fetchWeather = async () => {
  const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()
  const cityData = data.records.location.find(loc => loc.locationName === selectedCity.value)

  if (cityData) {
    const weather = cityData.weatherElement.find(e => e.elementName === 'Wx').time[0].parameter.parameterName
    const maxT = cityData.weatherElement.find(e => e.elementName === 'MaxT').time[0].parameter.parameterName
    const minT = cityData.weatherElement.find(e => e.elementName === 'MinT').time[0].parameter.parameterName
    const pop = cityData.weatherElement.find(e => e.elementName === 'PoP').time[0].parameter.parameterName

    weatherData.value = { weather, maxT, minT, pop }
    updateWeatherStyle(weather)
  }
}

// 設定背景與圖示
const updateWeatherStyle = (weather) => {
  if (weather.includes('雷')) {
    weatherClass.value = 'thunder'
    weatherIcon.value = 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png'
  } else if (weather.includes('雨')) {
    weatherClass.value = 'rainy'
    weatherIcon.value = 'https://cdn-icons-png.flaticon.com/512/4150/4150897.png'
  } else if (weather.includes('陰')) {
    weatherClass.value = 'cloudy'
    weatherIcon.value = 'https://cdn-icons-png.flaticon.com/512/414/414825.png'
  } else {
    weatherClass.value = 'sunny'
    weatherIcon.value = 'https://cdn-icons-png.flaticon.com/512/869/869869.png'
  }
}

onMounted(() => {
  fetchCities().then(() => fetchWeather())
})

watch(selectedCity, fetchWeather)
</script>

<style scoped>
.weather-app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: background 0.5s ease;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.weather-info {
  text-align: center;
}

.weather-icon {
  width: 100px;
  margin-bottom: 1rem;
}

/* RWD */
@media (max-width: 600px) {
  .container {
    padding: 1rem;
  }

  .weather-icon {
    width: 70px;
  }
}

/* 背景漸層樣式 */
.sunny {
  background: linear-gradient(to bottom, #87CEEB, #ffffff);
}
.cloudy {
  background: linear-gradient(to bottom, #ccc, #eee);
}
.rainy {
  background: linear-gradient(to bottom, #3a3a3a, #666);
}
.thunder {
  background: linear-gradient(to bottom, #000000, #333333);
}
</style>
