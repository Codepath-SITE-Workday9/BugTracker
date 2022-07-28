/*
    Note: For some very weird reason, the last chart that gets rendered on the dashboard MUST be the first chart listed here. Otherwise it won't load on the page.
    No idea why, but that's how it is.
*/


export default function renderCharts() { 

    //let myChart = document.getElementById("myChart")

    

    let myChart = new Chart(document.getElementById("priority-chart").getContext('2d'), {
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

