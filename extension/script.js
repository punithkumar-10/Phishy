// script.js content remains as provided
const ctx = document.getElementById("myPieChart").getContext("2d");

const data = {
  labels: ["Value 1", "Value 2"],
  datasets: [
    {
      data: [50, 50], // Default values
      backgroundColor: ["#27573B", "#803640"],
      borderColor: "transparent",
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
  },
};

const myPieChart = new Chart(ctx, config);
