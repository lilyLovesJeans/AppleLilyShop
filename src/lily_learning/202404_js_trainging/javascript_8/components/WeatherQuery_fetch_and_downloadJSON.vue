<template>
  <h2>🌦️ Promise 練習：天氣資料取得</h2>

  
  <div>
    <button @click="testFetchWithAwait">測試連線，用Await, 並下載 JSON檔案</button>
  </div>

</template>

<script setup>
const apiKey = 'CWA-290D12F1-3FA3-4A61-B613-623327DD04C2' // 請換成自己的
const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`


const testFetchWithAwait = async() =>{
  try{
    const response = await fetch(url)
    console.log('狀態碼:',response.status)

    const data = await response.json()
    console.log('✅ 收到資料:',data)
    // console.log(data.records.location[0])
    console.log(JSON.stringify(data, null, 2))
     // Step 2：將 JSON 轉成文字
    const jsonString = JSON.stringify(data,null,2)
    
    // Step 3：觸發下載 JSON 檔案
    const blob = new Blob([jsonString],{type: 'application/json'})

    const downloadUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = 'weather_data.json'
    a.click()
    URL.revokeObjectURL(downloadUrl)

  } catch(error){
    console.error('❌ 發生錯誤:',error)
  }
}



</script>
