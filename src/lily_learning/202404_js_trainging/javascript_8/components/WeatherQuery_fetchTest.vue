<template>
  <h2>🌦️ Promise 練習：天氣資料取得</h2>

  <div>
    <button @click="testFetchWithThen">測試連線，用.then</button>
  </div>

  <div>
    <button @click="testFetchWithAwait">測試連線，用Await</button>
  </div>

</template>

<script setup>
const apiKey = 'CWA-290D12F1-3FA3-4A61-B613-623327DD04C2' // 請換成自己的
const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`

const testFetchWithThen = ()=> {
  fetch(url)
    .then(response =>{
      console.log('✅ 收到 response')
      console.log('狀態碼：',response.status)
      return response.json()
    })
    .then(data =>{
      console.log('✅ 收到資料:', data)
      console.log(data.records.location[0])
    })
    .catch(error => {
      console.error('❌ 發生錯誤:', error)
    })
}

const testFetchWithAwait = async() =>{
  try{
    const response = await fetch(url)
    console.log('狀態碼:',response.status)

    const data = await response.json()
    console.log('✅ 收到資料:',data)
  } catch(error){
    console.error('❌ 發生錯誤:',error)
  }
}



</script>
