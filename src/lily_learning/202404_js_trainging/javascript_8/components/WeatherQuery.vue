<template>
  <div class="container">
    <h2>🌦️ 天氣查詢應用程式</h2>
    <p>📅 資料時間：{{ queryDateText }}</p>

    <div class="checkbox-group">
      <label class="region-row">
        <span class="region-title">全部：</span>
        <input
          type="checkbox"
          value="全部"
          v-model="selectedCities"
          @change="handleAllToggle"
        />
        <span>全部城市</span>
      </label>

      <div v-for="(cities, region) in cityGroups" :key="region" class="region-row">
        <span class="region-title">{{ region }}：</span>
        <label v-for="city in cities" :key="city" class="city-checkbox-inline">
          <input
            type="checkbox"
            :value="city"
            v-model="selectedCities"
            :disabled="selectedCities.includes('全部')"
          />
          {{ city }}
        </label>
      </div>
    </div>

    <p>✅ 目前選擇：{{ selectedCities.join(', ') }}</p>

    <div class="weather-container">
      <div
        v-for="city in sortedWeatherData"
        :key="city.locationName"
        class="city-card"
        :class="getWxClass(city)"
      >
        <h3>
          🌆 {{ city.locationName }}
          <span class="weather-icon">{{ getWxIcon(city) }}</span>
        </h3>
        <p>☀️ 天氣：{{ getWeatherElement(city, 'Wx') }}</p>
        <p>🔥 最高溫：{{ getWeatherElement(city, 'MaxT') }}°C</p>
        <p>❄️ 最低溫：{{ getWeatherElement(city, 'MinT') }}°C</p>
        <p>🌧️ 降雨機率：{{ getWeatherElement(city, 'PoP') }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const apiKey = 'CWA-290D12F1-3FA3-4A61-B613-623327DD04C2' // <<--- 請替換為你註冊的 CWA API Key
const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`

const weatherData = ref([])
const selectedCities = ref(['全部'])
const queryDateText = ref('') // 🌟 顯示查詢時間

const cityGroups = {
  北部: ['臺北市', '新北市', '基隆市', '桃園市', '新竹縣', '新竹市'],
  中部: ['苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣'],
  南部: ['嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣'],
  東部: ['宜蘭縣', '花蓮縣', '臺東縣'],
  離島: ['澎湖縣', '金門縣', '連江縣']
}

const officialCityOrder = Object.values(cityGroups).flat()

onMounted(async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    weatherData.value = data.records.location

    // 🌟 抓第一筆 Wx 的 startTime
    const firstWx = data.records.location?.[0]?.weatherElement.find(el => el.elementName === 'Wx')
    queryDateText.value = firstWx?.time[0]?.startTime || new Date().toLocaleString()
  } catch (error) {
    console.error('❌ 發生錯誤:', error)
  }
})

const sortedWeatherData = computed(() => {
  const filtered = selectedCities.value.includes('全部')
    ? weatherData.value
    : weatherData.value.filter(city =>
        selectedCities.value.includes(city.locationName)
      )

  return [...filtered].sort(
    (a, b) =>
      officialCityOrder.indexOf(a.locationName) -
      officialCityOrder.indexOf(b.locationName)
  )
})

function handleAllToggle() {
  if (selectedCities.value.includes('全部')) {
    selectedCities.value = ['全部']
  }
}

function getWeatherElement(city, elementName) {
  const element = city.weatherElement.find(el => el.elementName === elementName)
  return element?.time[0]?.parameter?.parameterName || 'N/A'
}

const wxClassMap = {
  '1': 'sunny',
  '2': 'cloudy',
  '3': 'partly-sunny',
  '4': 'overcast',
  '5': 'rainy',
  '6': 'rainy',
  '7': 'rainy',
  '8': 'rainy',
  '9': 'rainy',
  '10': 'rainy',
  '11': 'rainy',
  '12': 'rainy',
  '13': 'rainy',
  '14': 'rainy',
  '15': 'storm',
  '16': 'storm',
  '17': 'storm'
}

function getWxClass(city) {
  const wx = city.weatherElement.find(el => el.elementName === 'Wx')
  const code = wx?.time[0]?.parameter?.parameterValue
  return wxClassMap[code] || ''
}

function getWxIcon(city) {
  const wx = city.weatherElement.find(el => el.elementName === 'Wx')
  const code = wx?.time[0]?.parameter?.parameterValue
  const map = {
    '1': '☀️',
    '2': '☁️',
    '3': '🌤',
    '4': '🌥',
    '5': '🌧',
    '15': '⛈',
    '16': '⛈',
    '17': '⚡'
  }
  return map[code] || ''
}
</script>

<style scoped>
.container {
  margin-left: 10px;
}
h2 {
  font-size: 30px;
  margin-bottom: 0.5rem;
}
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.region-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.region-title {
  min-width: 4rem;
  font-weight: bold;
  color: #333;
}
.city-checkbox-inline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #f5f5f5;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
}
input[type='checkbox'] {
  accent-color: #3498db;
}

/* Weather cards */
.weather-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.city-card {
  flex: 1 1 300px;
  max-width: 300px;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-left: 6px solid #3498db;
  transition: background 0.3s ease;
}
.city-card.sunny {
  background: linear-gradient(#ffe082, #ffd54f);
  border-left-color: #fbc02d;
}
.city-card.cloudy {
  background: linear-gradient(#d7dde8, #cfd8dc);
  border-left-color: #90a4ae;
}
.city-card.partly-sunny {
  background: linear-gradient(#fff8e1, #ffe082);
  border-left-color: #fbc02d;
}
.city-card.overcast {
  background: linear-gradient(#b0bec5, #90a4ae);
  border-left-color: #607d8b;
}
.city-card.rainy {
  background: linear-gradient(#a5c8ff, #81d4fa);
  border-left-color: #0288d1;
}
.city-card.storm {
  background: linear-gradient(#616161, #9e9e9e);
  border-left-color: #ffca28;
}
.weather-icon {
  margin-left: 0.5rem;
}
</style>
