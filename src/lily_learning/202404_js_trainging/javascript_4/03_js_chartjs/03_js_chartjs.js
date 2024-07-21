
// 獲取 canvas 元素
var canvas = document.getElementById('chart1Canvas');
// 從 canvas 元素的 data-chart-type 屬性獲取圖表類型
var chartType = canvas.getAttribute('data-chart-type') || 'bar'; // 默認為 'bar'

var ctx = canvas.getContext('2d');
const data_1 = [
  { year: 2024, grade: 77 },
  { year: 2025, grade: 74 },
  { year: 2026, grade: 77 },
  { year: 2027, grade: 68 },
  { year: 2028, grade: 36 },
  { year: 2029, grade: 60 },
  { year: 2030, grade: 80 },
  { year: 2031, grade: 93 },
  { year: 2032, grade: 66 },
  { year: 2033, grade: 58 },
];
const data_2 = [
  { year: 2024, grade: 85 },
  { year: 2025, grade: 82 },
  { year: 2026, grade: 59 },
  { year: 2027, grade: 57 },
  { year: 2028, grade: 81 },
  { year: 2029, grade: 84 },
  { year: 2030, grade: 83 },
  { year: 2031, grade: 71 },
  { year: 2032, grade: 70 },
  { year: 2033, grade: 86 },
];
const data_3 = [
  { year: 2024, grade: 82 },
  { year: 2025, grade: 73 },
  { year: 2026, grade: 65 },
  { year: 2027, grade: 55 },
  { year: 2028, grade: 59 },
  { year: 2029, grade: 62 },
  { year: 2030, grade: 61 },
  { year: 2031, grade: 80 },
  { year: 2032, grade: 71 },
  { year: 2033, grade: 87 },
];
const backgroundColor =  [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];
const borderColor =  [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
]
var myChart = new Chart(ctx, {
  type: chartType, // 使用變數設置圖表類型
  data: {
    //標題
    
    labels: data_1.map(row => row.year),
    datasets: [
      {
      label: '圓圈圈', //標籤
      data: data_1.map(row => row.grade), //資料
      //圖表背景色
      backgroundColor: backgroundColor,
      //圖表外框線色
      borderColor: borderColor,
      //外框線寬度
      borderWidth: 1,
      tension: .3 // 設定線條的張力
      },
      {
        label: '布斯朗', //標籤
        data: data_2.map(row => row.grade), //資料
        //圖表背景色
        backgroundColor: backgroundColor,
        //圖表外框線色
        borderColor:borderColor,
        //外框線寬度
        borderWidth: 1,
        tension: 0.3 // 設定線條的張力
        },
        {
          label: '莎町瑜', //標籤
          data: data_3.map(row => row.grade), //資料
          //圖表背景色
          backgroundColor: backgroundColor,
          //圖表外框線色
          borderColor:borderColor,
          //外框線寬度
          borderWidth: 1,
          tension: 0.3 // 設定線條的張力
          }
  ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: '紫微十年大運',
            font: {
              size: 24 // 設定字體大小為24px
          }
        }
    },
    scales: {
        x: {
          ticks: {
              // 設定標籤旋轉角度為45度
              maxRotation: 45, // 最大旋轉角度
              minRotation: 45  // 最小旋轉角度
          }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                beginAtZero: true,
                min: Math.min(...data_1.map(row => row.grade), ...data_3.map(row => row.grade)),
                max: Math.max(...data_1.map(row => row.grade), ...data_3.map(row => row.grade))
            }
        }
    }
}



});














