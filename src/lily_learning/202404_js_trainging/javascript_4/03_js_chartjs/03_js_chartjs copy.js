// 獲取 canvas 元素
var canvas = document.getElementById('myChart');
// 從 canvas 元素的 data-chart-type 屬性獲取圖表類型
var chartType = canvas.getAttribute('data-chart-type') || 'bar'; // 默認為 'bar'

var ctx = canvas.getContext('2d');
var myChart = new Chart(ctx, {
  type: chartType, // 使用變數設置圖表類型
  data: {
    //標題
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# myChart', //標籤
      data: [12, 19, 3, 5, 2, 3], //資料
      //圖表背景色
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      //圖表外框線色
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      //外框線寬度
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          responsive: true //符合響應式
        }
      }]
    }
  }
});
