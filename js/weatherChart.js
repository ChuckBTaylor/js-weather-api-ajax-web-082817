const API_KEY = "e0b910edff7ff9b0";
const URL =
  "http://api.wunderground.com/api/" + API_KEY + "/hourly/q/NY/New_York.json";
function getFahrenheits(results) {
  return results.map(result => parseInt(result.temp.english));
}

function getHours(results) {
  return results.map(result => ({
    hour: result.FCTTIME.hour,
    day: result.FCTTIME.mday,
    month: result.FCTTIME.mon
  }));
}

function generateDataSet(hours, temperatures) {
  const ctx = document.getElementById("NYCWeatherChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: hours,
      datasets: [
        {
          label: "Temperature",
          data: temperatures,
          backgroundColor: [
            "rgba(255, 99, 143, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ]
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

function makeWeatherRequest() {
  fetch(`${URL}`, {})
    .then(res => res.json())
    .then(json => {
      const times = getHours(json.hourly_forecast);
      const hours = times.map(time => time.hour);
      const effs = getFahrenheits(json.hourly_forecast);
      generateDataSet(hours, effs);
    });
}
window.onload = makeWeatherRequest();
// window.onload = function() {
//   const ctx = document.getElementById("NYCWeatherChart");
//   const myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//       datasets: [
//         {
//           label: "Temperature",
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(54, 162, 235, 0.2)",
//             "rgba(255, 206, 86, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(153, 102, 255, 0.2)",
//             "rgba(255, 159, 64, 0.2)"
//           ],
//           borderColor: [
//             "rgba(255,99,132,1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(255, 159, 64, 1)"
//           ],
//           borderWidth: 1
//         }
//       ]
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true
//             }
//           }
//         ]
//       }
//     }
//   });
// };
