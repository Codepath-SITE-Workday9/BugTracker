/*
    Note: For some very weird reason, the last chart that gets rendered on the dashboard MUST be the first chart listed here. Otherwise it won't load on the page.
    No idea why, but that's how it is.
*/
import {useState, setState} from 'react';




export default function renderCharts(dashboardStatistics, rendered, setRendered) { 

  //console.log(dashboardStatistics?.data?.statistics)
  if (dashboardStatistics?.data?.statistics) {
    setRendered(true)
    // console.log("Set rendered to true")
    // console.log("rendered:", rendered)
  }    

    //console.log("RenderCharts dashboardStatistics:", dashboardStatistics)


    
    // dashboardStatistics.data.statistics.perStatus.find(
    //   (item) => 
    // )

    // Get data of the status table, if it does not exist it defaults to 0
    let statusData = [0, 0, 0, 0,]
    dashboardStatistics?.data?.statistics?.perStatus?.map((statusType) => {
      // if (statusType.status === 'unassigned') {
      //   statusData[0] = parseInt(statusType.totaltickets)
      // }
      if (statusType.status === 'not started') {
        statusData[0] = parseInt(statusType.totaltickets)
      }
      else if (statusType.status === 'in progress') {
        statusData[1] = parseInt(statusType.totaltickets)
      }
      else if (statusType.status === 'submitted') {
        statusData[2] = parseInt(statusType.totaltickets)
      }
      else if (statusType.status === 'resolved')   {
        statusData[3] = parseInt(statusType.totaltickets)
      }
    })

    // Retrieve priority data
    let priorityData = [0, 0, 0, 0]
    dashboardStatistics?.data?.statistics?.perPriority?.map((type) => {
      if (type.priority === 'low') {
        priorityData[0] = parseInt(type.totaltickets)
      }
      else if (type.priority === 'medium') {
        priorityData[1] = parseInt(type.totaltickets)
      }
      else if (type.priority === 'high') {
        priorityData[2] = parseInt(type.totaltickets)
      }
      else if (type.priority === 'critical') {
        priorityData[3] = parseInt(type.totaltickets)
      }
    })

    // Retrieve category data
    let categoryData = [0, 0]
    dashboardStatistics?.data?.statistics?.perCategory?.map((type) => {
      if (type.category === 'bug') {
        categoryData[0] = parseInt(type.totaltickets)
      }
      else if (type.category === 'new feature') {
        categoryData[1] = parseInt(type.totaltickets)
      }

    })


  if (document.getElementById("priority-chart") != null) {
    let myChart = new Chart(document.getElementById("priority-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Low", "Medium", "High", "Critical"],
      datasets: [
        {
          label: "Tickets",
          backgroundColor: ["#3AD83F", "#CFD126","#E04423","#813424","#c45850"],
          data: priorityData
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Tickets by Priority'
      },
      maintainAspectRatio: false
    }
    })
  }

  if (document.getElementById("category-chart") != null) {
    let myChart2 = new Chart(document.getElementById("category-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Bug", "New Feature"],
          datasets: [
            {
              label: "Tickets",
              backgroundColor: ["#CFD126", "#3e95cd","#3cba9f","#e8c3b9","#c45850"],
              data: categoryData
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Tickets by Category'
          },
          maintainAspectRatio: false
        }
        })
    }

  if (document.getElementById("status-chart") != null) {
    let myChart3 = new Chart(document.getElementById("status-chart"), {
        type: 'doughnut',
        data: {
            labels: ["Not Started", "In Progress", "Submitted", "Resolved"],
            datasets: [
            {
                label: "Tickets",
                backgroundColor: ["#E04423", "#3e95cd","#328442","#3AD83F","#c45850"],
                data: statusData
            }
            ]
        },
        options: {
            title: {
            display: true,
            text: 'Tickets by Status'
            },
            maintainAspectRatio: false
        }
        })
  }
        
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
