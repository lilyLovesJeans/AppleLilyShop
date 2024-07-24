var lineCanvas = document.getElementById('chart1Canvas');
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
var lineData = {
    labels: data_1.map(row => row.year),
    datasets:[
        {
            label: '火小姐' ,
            data: data_1.map(row => row.grade)
        }
    ]

}

console.log(lineData);
var lineChart = new Chart(lineCanvas,{
    type: 'line',
    data:  lineData ,
    });
   