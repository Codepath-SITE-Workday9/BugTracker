/*
    Note: For some very weird reason, the last chart that gets rendered on the dashboard MUST be the first chart listed here. Otherwise it won't load on the page.
    No idea why, but that's how it is.
*/
import apiClient from "./apiClient"


export default function renderCharts() { 

    //let myChart = document.getElementById("myChart")
    const statistics = apiClient.getAllStatistics()
    //console.log("statistics below")
    //console.log(statistics)
    

    let myChart = new Chart(document.getElementById("priority-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Priority chart'
      },
      maintainAspectRatio: false
    }
    })

    let myChart2 = new Chart(document.getElementById("category-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [2478,5267,734,784,433]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Category chart'
          },
          maintainAspectRatio: false
        }
        })

    let myChart3 = new Chart(document.getElementById("status-chart"), {
        type: 'doughnut',
        data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [2478,5267,734,784,433]
            }
            ]
        },
        options: {
            title: {
            display: true,
            text: 'Status chart'
            },
            maintainAspectRatio: false
        }
        })

      // let myChart4 = new Chart(document.getElementById("user-statistics-chart"), {
      //   type: 'bar',
      //   data: {
      //     labels: Utils.months({count: 7}),
      //     datasets: [{
      //       label: 'My First Dataset',
      //       data: [65, 59, 80, 81, 56, 55, 40],
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)'
      //       ],
      //       borderColor: [
      //         'rgb(255, 99, 132)',
      //         'rgb(255, 159, 64)',
      //         'rgb(255, 205, 86)',
      //         'rgb(75, 192, 192)',
      //         'rgb(54, 162, 235)',
      //         'rgb(153, 102, 255)',
      //         'rgb(201, 203, 207)'
      //       ],
      //       borderWidth: 1
      //     }]
      //   },
      //   options: {
      //     scales: {
      //       y: {
      //         beginAtZero: true
      //       }
      //   }}
      // })
        /*
    let myChart4 = new Chart(document.getElementById("priority-chart"), {
        type: 'doughnut',
        data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [2478,5267,734,784,433]
            }
            ]
        },
        options: {
            title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
            }
        }
        }) */
};

