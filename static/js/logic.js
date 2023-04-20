// Get the select element for the new API call
let select = document.getElementById("select-table");

// Get the default selected value (the first option in the select element)
let defaultSelectedValue = select.options[1].value;

// Call the function to update all the charts based on the default selected value
updateCharts(defaultSelectedValue);



// Add event listener to detect when a new option is selected
select.addEventListener("change", function () {
  // Get the selected value
  const selectedValue = select.value;

  // Call the function to update all the charts based on the new selected value
  updateCharts(selectedValue);
});


function updateCharts(selectedValue) {
  // Use D3 to get the data from the API for the selected value
  d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`).then(function (data) {
    // The data is the same for all charts. Give a name for each chart data for plotting
    const barData = data;
    const pieData = data;
    const bubbleData = data;

    // Create the bar chart and pie chart using the data
    displayCharts(barData, pieData, bubbleData);
  });
}

function displayCharts(barData, pieData, bubbleData) {
  console.log(`Bar Data`, barData);
  console.log(`Pie Data`, pieData);
  console.log(`Bubble Data`, bubbleData);

  // Extract the necessary data for the charts
  let barChartData = [];
  let pieChartData = [];
  let alpha3Array = [];
  let bubbleChartData = [];
  // Loop through the data to extract the necessary information for the bubble chart
  bubbleData.forEach(function (item) {

    let alpha3 = item.alpha3;
    let quantity = item.quantity;
    let year = item.year;
    let region = item.region;
    let sub = item.subregion;
    bubbleChartData.push({ alpha3: alpha3, quantity: quantity, year: year, region: region, subregion: sub });
  });

  // Set the bubble chart parameters
  const bubbleChart = [{
    x: bubbleChartData.map(function (item) { return item.year; }),
    y: bubbleChartData.map(function (item) { return item.subregion; }),

    mode: 'markers',
    marker: {
      size: bubbleChartData.map(function (item) { return item.quantity; }),
      sizemode: 'area',
      sizeref: .8,
      opacity: 0.6,
      line: {
        color: bubbleChartData.map(function (item) { return item.alpha3; }),
        width: 1

      },

      color: bubbleChartData.map(function (item) { return item.quantity; }),
      colorscale: [
        [0.000, " #fa6e6e"],
        [0.111, "#ea6589"],
        [0.222, "#cf659e"],
        [0.333, "#ac68ab"],
        [0.444, "#846bae"],
        [0.556, "#5d6ca7"],
        [0.667, "#3a6a98"],
        [0.778, "#236483"],
        [0.889, "#215d6d"],
        [1.000, "#2a5458"]
      ],
      colorbar: {
        title: 'Quantity'
      }
    },
    hovertemplate:
      "<b>Region: %{y}</br>" +
      'Terawatt hours: %{marker.color:.2f}<br>' +
      '<b>Year %{x}</br>' +
      'Country Code %{marker.line.color}</b>',
  }];

  // Set the size of the chart visualization and title
  const bubbleLayout = {
    width: 1500,
    height: 1000,
    autosize: false,
    margin: {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    },
    hovermode: "closest",
    title: 'Bubble Chart for Selected Energy Source',
    geo: {
      projection: {
        type: 'equirectangular'
      },

    }
  };

  // Loop through the data to extract the necessary information for the bar chart
  barData.forEach(function (item) {
    let alpha3 = item.alpha3;
    let year = item.year;
    let quantity = item.quantity;

    // If the alpha3 is not in the alpha3 array, add it to the array and create a new object
    if (!alpha3Array.includes(alpha3)) {
      alpha3Array.push(alpha3);
      barChartData.push({ alpha3: alpha3, data: [] });
    }

    // Find the index of the alpha3 in the alpha3 array
    let alpha3Index = alpha3Array.indexOf(alpha3);

    // Add the year and quantity to the data array for the corresponding alpha3 object
    barChartData[alpha3Index].data.push({ year: year, quantity: quantity });
  });

  // Sort the alpha3 objects by the total quantity in descending order
  barChartData.sort(function (a, b) {
    let aQuantity = a.data.reduce((total, item) => total + item.quantity, 0);
    let bQuantity = b.data.reduce((total, item) => total + item.quantity, 0);
    return bQuantity - aQuantity;
  });

  // Take only the top 10 alpha3 objects
  barChartData = barChartData.slice(0, 10);

  // Set the bar chart parameters
  const barChart = [];

  // Define an array of colors for the bars
  const colors = ['#fa6e6e', '#ea6589', '#cf659e', '#ac68ab', '#846bae', '#5d6ca7', '#3a6a98', '#236483', '#215d6d', '#2a5458'];

  // Loop through the top 10 alpha3 objects to create the traces for the bar chart
  barChartData.forEach(function (alpha3Data, i) {
    let alpha3 = alpha3Data.alpha3;
    let years = alpha3Data.data.map(function (item) { return item.year; });
    let quantities = alpha3Data.data.map(function (item) { return item.quantity; });

    barChart.push({
      x: years,
      y: quantities,
      name: alpha3,
      type: "bar",
      text: alpha3Data.data.map(function (item) { return item.alpha3; }),
      title: "top ten countries",
      marker: {
        color: colors[i],
        line: {
          color: 'black',
          width: 1
        },
        bar: {
          width: 5
        }
      },
      text: alpha3Data.data.map(function (item) { return item.alpha3; }),
      hovermode: "closest",
      hovertemplate:
        `<b>Country Code${name}</br>` +
        'Terawatt hours: %{y:.2f}<br>' +
        'Year %{x:}</b>',
    });
  });

  // Loop through the data to extract the necessary information for the pie chart
  pieData.forEach(function (item) {

    let quantity = item.quantity;
    let reg = item.region;
    pieChartData.push({
      quantity: quantity,
      region: reg,
    });
  });

  // Sort the pie chart data by the quantity in descending order
  pieChartData.sort(function (a, b) {
    return b.quantity - a.quantity;
  });

  // Set the pie chart parameters
  const pieChart = [{
    values: pieChartData.map(function (item) { return item.quantity; }),
    labels: pieChartData.map(function (item) { return item.region; }),
    type: "pie",
    pull: .025,
    marker: {
      line: {
        color: 'black',  // set the border color to white
        width: 2  // set the border width to 2 pixels
      }

    }
  }];

  // Set the size of the chart visualization and title
  const barLayout = {
    width: 800,
    height: 600,
    font: {
      size: 15
    },
    title: 'Top 10 Countries for the Selected Energy Source',
    grid: { rows: 1, columns: 1 },
    margin: {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    },
  };
  const pieLayout = {
    width: 800,
    height: 600,
    font: {
      size: 15
    },
    colorway: ['#fa6e6e', '#ea6589', '#cf659e', '#ac68ab', '#846bae', '#5d6ca7', '#3a6a98', '#236483', '#215d6d', '#2a5458'],
    title: 'Total Terawatt Hours For The Selected Energy Source<br> Combined Over The 20 Year Range',


    margin: {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    },
  };

  // Plot the bubble chart
  Plotly.newPlot('bar', barChart, barLayout);
  Plotly.newPlot('pie', pieChart, pieLayout);
  Plotly.newPlot('bubble', bubbleChart, bubbleLayout);
}