const { createApp } = Vue;

const app = createApp({
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
                this.notes.push({ ...this.newNote }); // 將新筆記添加到 notes 陣列中, 這是淺拷貝
                this.newNote = { title: '', content: '', color: 'red' }; // 清空表單
            } else {
                alert("請填寫標題和內容"); // 確保標題和內容不為空
            }
        },
        deleteNote(index) {
            this.notes.splice(index, 1); // 刪除指定索引的筆記
        }
    },
    watch: {
        // 監聽 notes 陣列的變化
        notes: {
            handler(newNotes) {
                // 每次 notes 更新後，將 notes 存儲到 Local Storage
                localStorage.setItem('notes', JSON.stringify(newNotes));
            },
            deep: true // 監聽嵌套物件的變化
        }
    },
    mounted() {
        // 應用啟動時從 Local Storage 加載筆記
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes); // 如果有筆記資料，則加載它們
        }
        // 使用 ref 引用 textarea 并应用 autosize
        autosize(this.$refs.autoResizeTextArea);
    }
});

// 將 Vue 應用實例掛載到 #app
app.mount('#app');
