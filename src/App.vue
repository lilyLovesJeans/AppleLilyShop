<script setup>

</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/stopwatch">碼表應用程式</router-link>
      <router-link to="/Notes">筆記應用程式</router-link>
      <router-link to="/splitbill">分帳應用程式</router-link>
      <router-link to="/calendar">行事曆應用程式</router-link>
      <router-link to="/weather">天氣查詢應用程式</router-link>
      <router-link to="/countryinfo">國家資訊與地圖應用程式</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>


<style scoped>
  html, body {
   height: 100%; /* 確保 html 和 body 佔滿瀏覽器視窗 */
   margin: 0; /* 移除預設外邊距 */
  }
  nav {
    background-color: #f8f9fa; /* 淺灰色背景 */
    padding: 10px; /* 上下內邊距 */
    border-radius: 8px; /* 邊角圓角 */
    margin: 10px 0; /* 外邊距 */
    display: flex;
    justify-content: space-around; /* 將連結平均分布 */
  }

  nav a {
    text-decoration: none; /* 去除超鏈接的下劃線 */
    color: #333; /* 設定文字顏色 */
    font-weight: bold; /* 字體加粗 */
  }

  nav a:hover {
    color: #007bff; /* 當滑鼠懸停時顏色變為藍色 */
  }
</style>
