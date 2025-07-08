<template>
  <div class="header">
    <h2>我的行事曆</h2>
    <div ref="calendarRef" id="calendar"></div>
  </div>

  <!-- 新增活動的表單 Modal -->
  <div v-if="showForm" class="modal-overlay">
    <div class="modal">
      <h3>新增活動</h3>
      <label>
        活動名稱：
        <input v-model="formData.title" type="text">
      </label>
      <label>
        活動日期：
        <input v-model="formData.date" type="date">
      </label>
      <label>
        活動時間：
        <input v-model="formData.time" type="time">
      </label>
      <div class="modal-buttons">
        <button @click="saveEvent">儲存</button>
        <button @click="showForm = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const calendarRef = ref(null)
const showForm = ref(false)
const formData = ref({
  title: '',
  date: '',
  time: ''
})

let calendar = null // 👈 這裡設全域變數，不要再用 window

const STORAGE_KEY = 'calendar-events'  // 👈 localStorage 專用 key 名

onMounted(() => {
  if (window.FullCalendar && window.FullCalendar.Calendar) {
    calendar = new window.FullCalendar.Calendar(calendarRef.value, {
      initialView: 'dayGridMonth',
      locale: 'zh-tw',
      events: loadEventsFromLocalStorage(), // 👈 初始化時載入 localStorage
      dateClick(info) {
        // 移除所有舊的按鈕
        document.querySelectorAll('.add-event-button').forEach(btn => btn.remove())

        // 移除舊的灰色背景
        document.querySelectorAll('.selected-day').forEach(el => {
          el.classList.remove('selected-day')
        })

        const cellEl = info.dayEl.querySelector('.fc-daygrid-day-frame')
        if (!cellEl) return

        // ✅ 加背景色 class
        cellEl.classList.add('selected-day')

        // ✅ 新增按鈕
        const button = document.createElement('button')
        button.className = 'add-event-button'
        button.innerHTML = `<span class="text">新增活動</span><span class="icon">➕</span>`

        button.onclick = () => {
          formData.value.date = info.dateStr
          formData.value.time = '09:00'
          formData.value.title = ''
          showForm.value = true
        }

        cellEl.appendChild(button)
      },
      eventClick(info){
        const confirmed = confirm(`是否刪除活動「${info.event.title}」?`)
        if (confirmed){
          info.event.remove()// ✅ 從行事曆上移除
          deleteEventFromLocalStorage(info.event)// ✅ 自 localStorage 移除
        }
      }
    })
    calendar.render()
  } else {
    console.error('FullCalendar 尚未載入，請確認 CDN script')
  }
})

function saveEvent() {
  if (!formData.value.title) {
    alert('請輸入活動名稱')
    return
  }

  const event = {
    title: formData.value.title,
    start: `${formData.value.date}T${formData.value.time}`
  }

  // ✅ 直接用 calendar.addEvent，不要掛到 window
  calendar.addEvent(event)
  saveEventToLocalStorage(event) // 👈 儲存到 localStorage

  showForm.value = false
}

function saveEventToLocalStorage(event) {
  const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  events.push(event)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

function loadEventsFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

function formatDateLocal(date) {
  const pad = n => n.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}


function deleteEventFromLocalStorage(event){
  const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  const updatedEvents = events.filter(e => {
    return !(e.title === event.title && e.start === formatDateLocal(event.start))
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents))
}



</script>

<style scoped>
.header{
  text-align: center;
}
#calendar {
  max-width: 800px;
  margin: 20px auto;
}

/* ✅ 點選日期格背景變淺灰色 */
:deep(.selected-day) {
  background-color: #f0f0f0 !important;
  transition: background-color 0.3s ease;
}

/* ✅ 新增活動按鈕基本樣式 */
:deep(.add-event-button) {
  background-color: #1e2b37;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ✅ 桌機版：顯示文字+icon */
:deep(.add-event-button .icon) {
  display: none;
}

:deep(.add-event-button .text) {
  display: inline;
}

/* ✅ 手機版 RWD：只顯示 icon */
@media (max-width: 600px) {
  :deep(.add-event-button .text) {
    display: none;
  }
  :deep(.add-event-button .icon) {
    display: inline;
    font-size: 16px;
  }
}

/* ✅ Modal 樣式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 300px;
}

.modal label {
  display: block;
  margin-bottom: 10px;
}

.modal input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
