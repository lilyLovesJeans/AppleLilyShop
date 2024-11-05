const { createApp } = Vue

  createApp({
    data() {
        return {
          notes: [
            {
              title: "春節行程安排",
              content: "吃飽睡，睡飽吃",
              color: "red",
            },
            {
              title: "工作待辦事項",
              content: "詢問各家廠商報價",
              color: "green",
            },
            {
              title: "運動健身計畫",
              content: "每天早上六點去健身",
              color: "blue",
            },
          ]
        }
      },
      mounted() {
        this.notes[0].content= "多出門、到處走走、也要多運動k"
      },
  }).mount('#app')