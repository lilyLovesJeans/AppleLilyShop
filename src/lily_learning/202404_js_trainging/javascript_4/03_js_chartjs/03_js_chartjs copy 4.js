// 獲取 canvas 元素
var lineCanvas = document.getElementById('chart1Canvas');
var barCanvas = document.getElementById('chart2Canvas');
var pieCanvas = document.getElementById('chart3Canvas');

// 獲取圖表類型
var lineChartType = lineCanvas.getAttribute('data-chart-type') || 'line';
var barChartType = barCanvas.getAttribute('data-chart-type') || 'bar';
var pieChartType = pieCanvas.getAttribute('data-chart-type') || 'pie';
var lineCtx = lineCanvas.getContext('2d');
var barCtx = barCanvas.getContext('2d');
var pieCtx = pieCanvas.getContext('2d');

// 定義資料
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
const data_bar_unsorted = [
  { country: '美國', Mton_CO2e: 4752.08 },
  { country: '中國', Mton_CO2e: 12466.32 },
  { country: '德國', Mton_CO2e: 665.88 },
  { country: '歐盟27國', Mton_CO2e: 2774.93 },
  { country: '印度', Mton_CO2e: 2648.78 },
  { country: '印尼', Mton_CO2e: 602.59 },
  { country: '伊朗', Mton_CO2e: 710.83 },
  { country: '日本', Mton_CO2e: 1084.69 },
  { country: '俄羅斯', Mton_CO2e: 1942.54 },
  { country: '南韓', Mton_CO2e: 626.80 },
];

// 將 data_bar 按 Mton_CO2e 降序排序
const data_bar = data_bar_unsorted.sort((a, b) => b.Mton_CO2e - a.Mton_CO2e);



// 定義背景色和邊框色
const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(199, 199, 199, 0.2)',
  'rgba(83, 102, 255, 0.2)',
  'rgba(255, 219, 64, 0.2)',
  'rgba(62, 162, 74, 0.2)',
  'rgba(128, 128, 128, 0.2)' // 新增的深灰色背景色
];
const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(255, 219, 64, 1)',
  'rgba(62, 162, 74, 1)',
  'rgba(128, 128, 128, 1)' // 新增的深灰色邊框色
];


// 設置線圖
var lineChart = new Chart(lineCtx, {
  type: lineChartType,
  data: {
    labels: data_1.map(row => row.year),
    datasets: [
      {
        label: '圓圈圈',
        data: data_1.map(row => row.grade),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        tension: 0.3
      },
      {
        label: '布斯朗',
        data: data_2.map(row => row.grade),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        tension: 0.3
      },
      {
        label: '莎町瑜',
        data: data_3.map(row => row.grade),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: '火水風十年大運',
        font: {
          size: 24
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        min: Math.min(...data_1.map(row => row.grade), ...data_2.map(row => row.grade), ...data_3.map(row => row.grade)),
        max: Math.max(...data_1.map(row => row.grade), ...data_2.map(row => row.grade), ...data_3.map(row => row.grade))
      }
    }
  }
});

// 設置柱狀圖
var barChart = new Chart(barCtx, {
  type: barChartType,
  data: {
    labels: data_bar.map(row => row.country),
    datasets: [{
      label: '公噸 CO2e',
      data: data_bar.map(row => row.Mton_CO2e),
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: '2021年十大排碳國'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
// 定義背景色和邊框色
const backgroundColor_pie = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(128, 128, 128, 0.2)', // 新增的深灰色背景色
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(199, 199, 199, 0.2)',
  'rgba(83, 102, 255, 0.2)',
  'rgba(255, 219, 64, 0.2)',
  'rgba(62, 162, 74, 0.2)',
];
const borderColor_pie = [
  'rgba(255, 99, 132, 1)',
  'rgba(128, 128, 128, 1)', // 新增的深灰色邊框色
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(255, 219, 64, 1)',
  'rgba(62, 162, 74, 1)',
];

// 假設 data_pie 的原始數據如下
const data_pie = [
  { country: '美國', CO2e_percentage: 4752.08 },
  { country: '中國', CO2e_percentage: 12466.32 },
  { country: '德國', CO2e_percentage: 665.88 },
  { country: '歐盟27國', CO2e_percentage: 2774.93 },
  { country: '印度', CO2e_percentage: 2648.78 },
  { country: '印尼', CO2e_percentage: 602.59 },
  { country: '伊朗', CO2e_percentage: 710.83 },
  { country: '日本', CO2e_percentage: 1084.69 },
  { country: '俄羅斯', CO2e_percentage: 1942.54 },
  { country: '南韓', CO2e_percentage: 626.80 },
  { country: '其他', CO2e_percentage: 9600.14 }
];

// 計算數據的總和
const totalPie = data_pie.reduce((acc, row) => acc + row.CO2e_percentage, 0);

// 更新 data_pie，將數據轉換為百分比
const data_pie_with_percentage = data_pie.map(row => ({
  country: row.country,
  CO2e_percentage: (row.CO2e_percentage / totalPie) * 100
}));

// 將 data_pie_with_percentage 按百分比降序排序
const sortedDataPie = data_pie_with_percentage.sort((a, b) => b.CO2e_percentage - a.CO2e_percentage);

// 更新餅圖的數據
var pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: sortedDataPie.map(row => row.country),
    datasets: [{
      label: 'CO2e 百分比',
      data: sortedDataPie.map(row => row.CO2e_percentage),
      backgroundColor: backgroundColor_pie,
      borderColor: borderColor_pie,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: '2021排碳比例'
      },
      legend: {
        position: 'bottom',
        labels: {
          padding: 20 // 可以調整這裡的 padding 來增加圖例與圖表之間的距離
        }
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          // 只顯示百分比，數值過小時顯示為 0%
          const percentage = context.chart.data.datasets[0].data[context.dataIndex];
          return `${percentage.toFixed(2)}%`;
        },
        color: '#000',
        font: {
          weight: 'bold'
        },
        anchor: 'end',
        align: 'top',
        offset: 10,
        clamp: true,
        padding: {
          bottom: 10
        },
        // 自定義連接線
        connectorColor: '#000',
        connectorWidth: 1
      }
    }
  }
});
