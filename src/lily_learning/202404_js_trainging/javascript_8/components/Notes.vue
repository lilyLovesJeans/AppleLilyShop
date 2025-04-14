// Notes.vue : 筆記應用程式

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import autosize from 'autosize';

export default {
  setup() {
    const title = ref(''); // 標題
    const note = ref(''); // 筆記
    const textarea = ref(null); // 參考textarea元素
    const notesList = ref([]); // 儲存所有筆記的標題清單

    // 初始化並導入localStorage中的筆記
    onMounted(() => {
      if (textarea.value) {
        autosize(textarea.value);
      }

      // 從 localStorage 載入筆記標題清單
      const storedNotes = Object.keys(localStorage); // 取得所有localStorage的key，即所有標題
      notesList.value = storedNotes;
    });

    // 清理資源
    onUnmounted(() => {
      if (textarea.value) {
        autosize.destroy(textarea.value);
      }
    });

    // 儲存筆記至 localStorage
    const saveToLocalStorage = () => {
      if (title.value.trim() !== '' && note.value.trim() !== '') {
        // 只有當標題與筆記內容都有填寫時才儲存
        localStorage.setItem(title.value, note.value); // 用標題作為key，筆記內容作為value儲存
        // 更新筆記清單
        if (!notesList.value.includes(title.value)) {
          notesList.value.push(title.value); // 當筆記是新標題時，將標題加入清單
        }
      }
    };
    const titleInput = ref(null); // 用來追蹤標題輸入框

    // 建立新筆記
    const enableEditing = () => {
      title.value = ''; // 清空標題
      note.value = ''; // 清空筆記
      nextTick(() => {
      // 確保 DOM 完成更新後設置焦點
      titleInput.value?.focus();
  });
    };

    // 載入選中的筆記
    const loadNote = (selectedTitle) => {
      title.value = selectedTitle;
      note.value = localStorage.getItem(selectedTitle); // 從localStorage取出對應標題的內容
    };

    // 監控筆記的變動並自動儲存
    const updateNote = () => {
      if (title.value.trim() !== '') {
        saveToLocalStorage();
      }
    };
    const deleteNote = (noteTitle) => {
      localStorage.removeItem(noteTitle);
      notesList.value = notesList.value.filter((title) => title !== noteTitle);
      if (title.value === noteTitle) {
        enableEditing();
      }
    };

    return {
      title,
      note,
      textarea,
      notesList,
      titleInput,
      enableEditing,
      saveToLocalStorage,
      loadNote,
      updateNote,
      deleteNote,
    };
  },
};
</script>



<template>
  <p class="s_header">Notes</p>
  <div class="container">
    <div class="notes_container">
      <div class="inputBox">
        <input
          type="text"
          v-model="title"
          ref="titleInput"
          required
          spellcheck="false"
          @input="updateNote" />
        <span class="labelline">標題</span>
      </div>
      <div class="inputBox">
        <textarea
          v-model="note"
          ref="textarea"
          spellcheck="false"
          required
          @input="updateNote" >
        </textarea>
        <span class="labelline">筆記</span>
      </div>

      <div class="btn-container">
        <a href="#" class="btn" @click.prevent="enableEditing">建立新筆記</a>
      </div>
      <div class="footer">筆記應用程式</div>
    </div>
    <div class="notes-list">
        <p>筆記清單：</p>
        <ul>
          <li
          v-for="(noteTitle, index) in notesList"
          :key="index"
        >
          <span @click="loadNote(noteTitle)">{{ noteTitle }}</span>
          <button class="delete-btn" @click="deleteNote(noteTitle)">X</button>
        </li>
        </ul>
    </div>
  </div>

  
</template>



<style scoped>
  .s_header{
    font-size: 2.5em;
    font-weight: 600;
    color: #aa3d29;
    letter-spacing: 5px;
    word-spacing: 15px;
    text-align: center;
  }
  .container {
    display: flex;
    justify-content: space-between; /* 在容器內保持子元素之間的間隔 */
    gap: 10px; /* 子元素間的空隙 */
    width: 100%;
   
  }

  .notes_container {
    position: relative;
    flex: 7; /* 佔 70% */
    display: flex;
    align-items: center;
    flex-direction: column;   
    margin: 10px auto;
    min-height: 50vh;
    background-color: #1d2b3a;
    border-radius: 8px;
    box-shadow: rgba(116, 114, 114, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    padding: 30px;
    gap: 30px;
  }

  .notes-list {
    flex: 3; /* 佔 30% */
    margin: 10px auto;
    max-width: 240px; 
    background-color: #2d3a4a;
    border-radius: 8px;
    box-shadow: rgba(116, 114, 114, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    padding: 20px;
    color: #fff;
  }

  .notes-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .notes-list li {
    display: flex; /* 使用 Flexbox */
    justify-content: space-between; /* 將內容分散對齊 */
    align-items: center; /* 垂直置中 */
    cursor: pointer;
    padding: 5px 10px;
    border-bottom: 1px solid #444;
    color: #bdbabac9;
    transition: background-color 0.3s, color 0.3s;
  }

  .notes-list li:hover {
    background-color: #00dfc4;
    color: #000;
  }
  .delete-btn {
    color: #bdbabac9;
    background-color: inherit;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .delete-btn:hover {
    background-color: #fa5353;
  }

  .inputBox {
    position: relative;
    width: calc(100% - 20px); /* 寬度為父容器寬度減去 20px */
    margin: 0 auto; /* 讓 .inputBox 居中 */
  }
  .inputBox input , textarea{
      width: 100%;
      border: 1px solid rgba(255,255,255,0.25);
      background: #1d2b3a;
      border-radius: 5px;
      outline: none;
      padding: 10px;
      color: #bdbabac9;
      font-size: 1.5em;
      transition: 0.5s;
  }

  .inputBox textarea{
      resize: none;
  }

  .inputBox span{
      position: absolute;
      left: 0;
      top: -10px;
      padding: 10px;
      pointer-events: none;
      font-size: 1em;
      color: rgba(255,255,255,0.25);
      transition: 0.5s;
  }
  .inputBox input:focus ~ span ,
  .inputBox input:valid ~ span ,
  .inputBox textarea:focus ~ span,
  .inputBox textarea:valid ~ span
  { 
      color: #00dfc4;
      transform: translateX(10px) translateY(0px);
      font-size: 0.9em;
      padding: 0 10px ;
      background: #1d2b3a;
  }

  .inputBox input:focus  ,
  .inputBox input:valid   ,
  .inputBox textarea:focus,
  .inputBox textarea:valid 
  { 
      border: 1px solid #00dfc4 ;
  }



  .btn {
      
      text-decoration: none;
      display: inline-block;
      padding: 10px 20px;
      background-color: #000;
      color: #fff;
      border-radius: 5px;
      width: auto;
  }
  .btn:hover{
      background-color: #00dfc5a5;
      
  }
  .footer {
    position: absolute;
    bottom: 10px; /* 距離 .notes_container 的底部 10px */
    right: 10px;  /* 距離 .notes_container 的右側 10px */
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
  }
</style>
