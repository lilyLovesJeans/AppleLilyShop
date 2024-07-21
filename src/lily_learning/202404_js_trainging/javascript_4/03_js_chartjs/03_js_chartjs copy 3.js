// 繪製圖表的通用函數
function createChart(canvasId) {
  var canvas = document.getElementById(canvasId);
  var chartType = canvas.getAttribute('data-chart-type') || 'bar'; // 默認為 'bar'
  var ctx = canvas.getContext('2d');

  var data = {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: ['水電瓦斯', '樂活飲品', '運輸交通', '餐飲食物', '生活民生', '電子產品'],
      datasets: [{
          label: '碳足跡 / Kg CO2e',
          data: [350.25, 7.96, 0.12, 82.91, 1.83, 163.36],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  };


  new Chart(ctx, {
      type: chartType,
      data: data
  });
}

// 初始化所有圖表
function initCharts() {
  var charts = document.querySelectorAll('canvas[data-chart-type]');
  charts.forEach(function(canvas) {
      createChart(canvas.id);
  });
}

// 當 DOM 完全加載後初始化圖表
document.addEventListener('DOMContentLoaded', function() {
  initCharts();
});
