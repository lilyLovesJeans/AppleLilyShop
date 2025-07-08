<template>
    <div
      style="background-color: #ead7da;"
      class="p-6 sm:p-8 md:p-10 max-w-5xl mx-auto flex flex-col md:flex-row rounded-xl shadow-inner border border-[#d9b6bc]"
    >
      <!-- 左側輸入區 -->
      <div class="w-full md:w-1/4 md:pr-4 mb-4 md:mb-0 bg-white p-4 rounded-xl shadow">
        <h1 class="text-2xl font-bold mb-4">體重追蹤器</h1>
        <form @submit.prevent="addRecord" class="space-y-2 mb-4">
          <div>
            <label class="block mb-1">日期：</label>
            <input type="date" v-model="newRecord.date" class="w-full px-2 py-1 border rounded" />
          </div>
          <div>
            <label class="block mb-1">體重(kg)：</label>
            <input type="number" v-model.number="newRecord.weight" class="w-full px-2 py-1 border rounded" required />
          </div>
          <button
            type="submit"
            style="background-color: #c08497;"
            class="text-white px-4 py-1 rounded hover:brightness-90 w-full"
          >
            新增
          </button>
        </form>
  
        <ul class="space-y-2">
          <li
            v-for="(record, index) in sortedRecords"
            :key="record.id"
            class="flex justify-between items-center border p-2 bg-gray-100 rounded"
          >
            <span>{{ record.date }} - {{ record.weight }}kg</span>
            <button @click="deleteRecord(record.id)" class="text-red-500 hover:underline">刪除</button>
          </li>
        </ul>
      </div>
  
      <!-- 右側圖表區 -->
      <div class="w-full md:w-3/4 bg-white p-4 rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-2">體重變化圖</h2>
        <div class="bg-[#f2cfd4] p-4 rounded-lg">
          <canvas ref="chartCanvas" class="w-full h-64"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  
  const newRecord = ref({
    date: '',
    weight: null,
  })
  
  const records = ref([])
  
  const chartCanvas = ref(null)
  let weightChart = null
  
  onMounted(() => {
    const saved = localStorage.getItem('weight-records')
    if (saved) {
      records.value = JSON.parse(saved)
    }
    renderChart()
  })
  
  watch(records, (newVal) => {
    localStorage.setItem('weight-records', JSON.stringify(newVal))
    nextTick(() => renderChart())
  }, { deep: true })
  
  const addRecord = () => {
    if (!newRecord.value.date || !newRecord.value.weight) return
    records.value.push({
      id: Date.now(),
      date: newRecord.value.date,
      weight: newRecord.value.weight,
    })
    newRecord.value = { date: '', weight: null }
  }
  
  const deleteRecord = (id) => {
    records.value = records.value.filter(r => r.id !== id)
  }
  
  const sortedRecords = computed(() => {
    return [...records.value].sort((a, b) => new Date(a.date) - new Date(b.date))
  })
  
  const renderChart = () => {
    if (!chartCanvas.value) return
    if (weightChart) {
      weightChart.destroy()
    }
  
    const data = sortedRecords.value
    weightChart = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: data.map(r => r.date),
        datasets: [{
          label: '體重 (kg)',
          data: data.map(r => r.weight),
          borderColor: 'rgba(59,130,246,1)',
          backgroundColor: 'rgba(59,130,246,0.2)',
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '體重變化圖'
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }
  </script>
  