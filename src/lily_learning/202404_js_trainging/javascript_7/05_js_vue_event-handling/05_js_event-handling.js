const { createApp } = Vue;

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
            ],
            newNote: {
                title: '',
                content: '',
                color: 'red' // 預設顏色
            }
        };
    },
    methods: {
      addNote() {
          if (this.newNote.title && this.newNote.content) {
              this.notes.push({ ...this.newNote }); // 將新筆記添加到 notes 陣列中
              this.newNote = { title: '', content: '', color: 'red' }; // 清空表單
          } else {
              alert("請填寫標題和內容"); // 確保標題和內容不為空
          }
      },
      deleteNote(index) {
          this.notes.splice(index, 1); // 刪除指定索引的筆記
      }
  }
  
}).mount('#app');
