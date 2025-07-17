<!-- CountryInfo.vue：國家資訊與地圖應用程式 -->
<template>
  <div>
    <h2>🌍 國家資訊與地圖應用程式</h2>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    // 確保 L 存在
    if (!window.L) {
      throw new Error('Leaflet (L) 尚未載入，請確認 CDN 是否正確加在 index.html 中')
    }

    // const map = L.map('map').setView([20, 0], 2)
    const map = L.map('map').setView([24, 113], 4)


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    const DefaultIcon = L.icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    L.Marker.prototype.options.icon = DefaultIcon
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,latlng,flags,currencies')

    // const res = await fetch('https://restcountries.com/v3.1/all')
    const countries = await res.json()


    if (!Array.isArray(countries)) {
      console.error('API 傳回的資料不是陣列：', countries)
    return
}

    countries.forEach((country) => {
      const latlng = country.latlng
      const name = country.name?.common || '未知'
      const capital = country.capital?.[0] || '未知'
      const flag = country.flags?.png || ''
      const currency = country.currencies
        ? Object.values(country.currencies)[0]?.symbol || '未知'
        : '未知'

      if (latlng?.length === 2) {
        const marker = L.marker(latlng).addTo(map)
        marker.bindPopup(`
          <div style="text-align: center;">
            <img src="${flag}" width="80"><br>
            <strong>${name}</strong><br>
            首都：${capital}<br>
            貨幣：${currency}
          </div>
        `)
      }
    })
  } catch (err) {
    console.error('地圖初始化錯誤：', err)
  }
})
</script>


<style scoped>
h2{
  font-size: 30px;
  margin-bottom: 15px;
}
#map {
  height: 90vh;
  width: 100%;
}
</style>
