async function getChartData() {
  try {
    const res = await fetch("/chart");
    const chartData = await res.json();
    return chartData;
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
    return null;
  }
}

async function initChart() {
  const data = await getChartData();
  if (!data) return;

  const { labels, dataValues, colors } = data;

  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "80%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  const legendContainer = document.getElementById("chart_legend");
  legendContainer.innerHTML = "";

  labels.forEach((label, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="main__chart__legend__color" style="background-color: ${colors[index]}"></span>${label}<span class="main__chart__legend__value">${dataValues[index]}%</span>`;
    legendContainer.appendChild(li);
  });
}

initChart();
