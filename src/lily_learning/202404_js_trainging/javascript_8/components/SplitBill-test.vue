<template>
  <div class="app-container">
    <header class="header">分帳應用程式</header>
    
    <div class="middle-container">
      <div class="member-list">成員清單 (flex-grow: 1)</div>
      <div class="transactions">帳單記錄 (flex-grow: 2)</div>
    </div>

    <footer class="footer">
      <button>新增成員</button>
    </footer>
  </div>
</template>

<style scoped>
/* 主容器 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 頁面標題 */
.header {
  height: 100px;
  background-color: lightblue;
  text-align: center;
  font-size: 1.5em;
  line-height: 100px;
}

/* 中間區塊 (成員清單 + 帳單記錄) */
.middle-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* 成員清單 */
.member-list {
  flex-grow: 6;  /* 這裡改成 2 試試看！ */
  background-color: lightcoral;
  text-align: center;
  font-size: 1.2em;
  padding: 20px;
}

/* 帳單記錄 */
.transactions {
  flex-grow: 9;  /* 這裡改成 1 試試看！ */
  background-color: lightgray;
  text-align: center;
  font-size: 1.2em;
  padding: 20px;
}

/* 底部區塊 */
.footer {
  height: 80px;
  background-color: lightgreen;
  text-align: center;
  line-height: 80px;
}
</style>
