<script>
export default {
  name: "Stopwatch",
  data() {
    return {
      currentTimerValue: 0, // 當前時間戳
      timer: null,          // 計時器 ID
      lastUpdateTime: 0,    // 上次畫面更新的時間
      isRunning: false,     // 計時器是否運行的標誌
      isPaused: false,      // 是否處於暫停狀態
    };
  },
  computed: {
    formattedParts() {
      const totalSeconds = Math.floor(this.currentTimerValue / 1000); // 總秒數
      const ms = this.currentTimerValue % 1000; // 剩餘毫秒
      const msTwoDigits = Math.floor(ms / 10).toString().padStart(2, '0'); // 格式化毫秒為兩位數
      const seconds = totalSeconds % 60; // 剩餘秒
      const totalMinutes = Math.floor(totalSeconds / 60); // 總分鐘
      const minutes = totalMinutes % 60; // 剩餘分鐘
      const hours = Math.floor(totalMinutes / 60); // 小時

      return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: msTwoDigits,
      };
    },
  },
  methods: {
    startPauseTimer() {
      if (this.isRunning) {
        this.pauseTimer(); // 暫停計時
      } else if (this.isPaused) {
        this.resumeTimer(); // 繼續計時
      } else {
        this.startTimer(); // 開始計時
      }
    },
    startTimer() {
      if (this.timer) return; // 防止重複啟動
      this.isRunning = true; // 設置為運行狀態
      this.isPaused = false; // 設置為非暫停狀態
      this.lastUpdateTime = performance.now(); // 初始化上次時間
      this.timer = requestAnimationFrame(this.updateTime); // 開始更新
    },
    updateTime(currentTime) {
      // 計算經過的時間
      this.currentTimerValue += currentTime - (this.lastUpdateTime || currentTime);
      this.lastUpdateTime = currentTime; // 更新上次畫面更新的時間

      this.timer = requestAnimationFrame(this.updateTime); // 繼續下一幀
    },
    pauseTimer() {
      cancelAnimationFrame(this.timer); // 停止更新
      this.isRunning = false; // 設置為停止狀態
      this.isPaused = true;  // 設置為暫停狀態
      this.timer = null; // 清空計時器 ID
    },
    resumeTimer() {
      this.isRunning = true; // 設置為運行狀態
      this.isPaused = false; // 設置為非暫停狀態
      this.lastUpdateTime = performance.now(); // 初始化上次時間
      this.timer = requestAnimationFrame(this.updateTime); // 重新開始更新
    },
    resetTimer() {
      // 先停止計時器，避免計時器繼續運行
      this.pauseTimer(); // 

      // 清除時間和狀態
      this.currentTimerValue = 0; // 重置時間
      this.lastUpdateTime = 0; // 清空上次時間
      this.isRunning = false; // 停止計時器
      this.isPaused = false; // 清空暫停狀態
      this.timer = null; // 確保計時器 ID 被清空
    },

  },
};
</script>


<template>
  <div class="wrapper">
    <p class="s_header">Stop Watch</p>
    <div>
      <div class="digits">
        <p>
          <span>{{ formattedParts.hours }}</span>
          <span>:</span>
          <span>{{ formattedParts.minutes }}</span>
          <span>:</span>
          <span>{{ formattedParts.seconds }}</span>
          <span>.</span>
          <span class="ms">{{ formattedParts.milliseconds }}</span>
        </p>
      </div>
      <div class="button_container">
        <button :class="isRunning ? 'stop' : isPaused ? 'resume' : 'start'" @click="startPauseTimer">
          {{ isRunning ? '暫停' : isPaused ? '繼續' : '開始' }}
        </button>
        <button class="reset" @click="resetTimer">重設</button>
      </div>
    </div>
    <p class="s_bottom">碼表應用程式</p>
  </div>
</template>


<style scoped>
  
  .wrapper {
    position: relative;
    margin: auto;
    padding: 20px;
    width: 500px;
    height: 500px;
    background-color: #313131;
    border-radius: 10px;
  }

  .s_header {
    font-size: 2.5em;
    font-weight: 600;
    color: #aa3d29;
    letter-spacing: 5px;
    word-spacing: 15px;
  }

  div {
    text-align: center;
    margin-top: 20px;
    display: block; 
  }

  .digits {
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 10px;
    box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.6),
                inset -4px -4px 8px rgba(255, 255, 255, 0.1);
    text-align: center;
    margin: 20px;
  }

  p {
    font-size: 3em;
    font-weight: bold;
  }

  span {
    display: inline-block;
    width: 1em;
    text-align: center;
  }

  .ms {
    color: #eddfc2;
    background-color: #3d3636;
    padding-left: 10px;
    padding-right: 17px;
  }

  .button_container {
    margin-top: 40px;
  }

  button {
  width: 200px;
  height: 80px;
  padding-left: 30px;
  letter-spacing: 1em;
  font-size: 24px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  color: #eddfc2;
  transition: all 0.2s ease; /* 平滑過渡效果 */
}

.start , .resume{
  background-color: #367667; /* 按鈕啟動顏色 */
}

.stop {
  background-color: #aa3d29; /* 按鈕暫停顏色 */
}

.reset {
  background-color: #e67331; /* 按鈕重設顏色 */
}

/* 按下去的時候顏色變深並加上陰影 */
button:active {
  transform: translateY(4px); /* 模擬按鈕按下去的效果 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 增加陰影 */
  opacity: 0.7; /* 按下去時改變透明度 */
}

button:hover {
  opacity: 0.8;
}

.s_bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 10px;
  text-align: end;
  color: #eddfc2;
}

</style>
