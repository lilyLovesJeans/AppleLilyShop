<template>
  <h2>🌦️ 天氣查詢（第 1 步）</h2>

  <div>
    <h3>目前抓到的城市資料：</h3>
    <ul>
      <li v-for="city in weatherData" :key="city.locationName">
        ✅ {{ city.locationName }}
      </li>
    </ul>

    <pre>{{ weatherData }}</pre> <!-- 除錯用 -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const apiKey = 'CWA-290D12F1-3FA3-4A61-B613-623327DD04C2' // <<--- 請替換為你註冊的 CWA API Key
const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`

const allCities = ['臺北市', '臺中市', '高雄市'] // 只取這 3 個城市
const weatherData = ref([]) // 存放抓到的天氣資料

onMounted(async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    const locations = data.records.location

    // 過濾三個指定城市的資料
    weatherData.value = locations.filter(loc =>
      allCities.includes(loc.locationName)
    )
  } catch (error) {
    console.error('❌ 發生錯誤:', error)
  }
})
</script>
