/* Note: Another chart.js file had to be created for the user profile statistics table because
    website will crash if all charts are not used. Will result in null error from chart.min.js. Created
    a new */
    
export default function renderUserCharts(statsPerMonth) { 

         let myChart4 = new Chart(document.getElementById("user-statistics-chart"), {
           type: 'bar',
           data: {
             labels: ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"],
             datasets: [{
               label: 'Tickets Completed Overtime',
               data: [65, 59, 80, 81, 56, 55, 40, 5, 30, 90, 28, 65],
               backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 205, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 205, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(153, 102, 255, 0.2)'
               ],
               borderColor: [
                 'rgb(255, 99, 132)',
                 'rgb(255, 159, 64)',
                 'rgb(255, 205, 86)',
                 'rgb(75, 192, 192)',
                 'rgb(54, 162, 235)',
                 'rgb(153, 102, 255)',
                 'rgb(255, 99, 132)',
                 'rgb(255, 159, 64)',
                 'rgb(255, 205, 86)',
                 'rgb(75, 192, 192)',
                 'rgb(54, 162, 235)',
                 'rgb(153, 102, 255)'
               ],
               borderWidth: 1
             }]
           },
           options: {
             scales: {
               y: {
                 beginAtZero: true
               }
           }}
         })

        let chart5 = new Chart(document.getElementById("user-statistics-line-chart"), {
            type: 'line',
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"],
              datasets: 
              [
                {
                  label: 'Tickets Opened',
                  data: statsPerMonth.monthlyStatsOpened,
                  fill: 'start',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0
                },
                {
                  label: 'Tickets Closed',
                  data: statsPerMonth.monthlyStatsClosed,
                  fill: 'start',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  borderColor: 'rgb(153, 102, 255)',
                  tension: 0
                }
              ]
            }
        })
  };
  
  