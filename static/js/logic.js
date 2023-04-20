// Get the select element for the new API call
let select = document.getElementById("select-table");

// Get the default selected value (the first option in the select element)
let defaultSelectedValue = select.options[1].value;

// Call the function to update all the charts based on the default selected value
updateCharts(defaultSelectedValue);



// Add event listener to detect when a new option is selected
select.addEventListener("change", function() {
  // Get the selected value
  const selectedValue = select.value;

  // Call the function to update all the charts based on the new selected value
  updateCharts(selectedValue);
});


function updateCharts(selectedValue) {
  // Use D3 to get the data from the API for the selected value
  d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`).then(function(data) {
    // The data is the same for both charts. Give a name for each chart data
    const barData = data;
    const pieData = data;
    const mapData = data;

    // Create the bar chart and pie chart using the data
    displayCharts(barData, pieData,mapData);
  });
}

function displayCharts(barData, pieData, mapData) {
  console.log(`Bar Data`, barData);
  console.log(`Pie Data`, pieData);
  console.log(`Map Data`, mapData);

  // Extract the necessary data for the charts
  let barChartData = [];
  let pieChartData = [];
  let alpha3Array = [];
  let bubbleChartData = [];

  // Loop through the data to extract the necessary information for the bar chart
  barData.forEach(function(item) {
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
  barChartData.sort(function(a, b) {
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
  barChartData.forEach(function(alpha3Data, i) {
    let alpha3 = alpha3Data.alpha3;
    let years = alpha3Data.data.map(function(item) { return item.year; });
    let quantities = alpha3Data.data.map(function(item) { return item.quantity; });

    barChart.push({
      x: years,
      y: quantities,
      name: alpha3,
      type: "bar",
      title: "top ten countries",
      marker: {
        color: colors[i],
        line : {
          color:'black',
          width: 1
        },
        bar: {
          width: 5
        }
      }
    });
  });

  // Loop through the data to extract the necessary information for the pie chart
  pieData.forEach(function(item) {
    let sub = item.subregion;
    let quantity = item.quantity;
    let reg = item.region;
    pieChartData.push({ subregion: sub,
       quantity: quantity,
       region: reg,
      });
  });

  // Sort the pie chart data by the quantity in descending order
  pieChartData.sort(function(a, b) {
    return b.quantity - a.quantity;
  });
 

  // pieChartData = pieChartData.slice(0, 10);

  // Set the pie chart parameters
  const pieChart = [{  values: pieChartData.map(function(item) { return item.quantity; }),  
    labels: pieChartData.map(function(item) { return item.subregion + "," + item.region; }),  
    type: "pie",
    
    }];

  // Set the size of the chart visualization and title
  const barLayout = {
    width: 750,
    height:600,
    font: {
      size: 20
    },
    title: 'top 10 countries for the selected energy in Twh',
    grid: { rows: 1, columns: 1 },
    margin: {  margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }},
  };
  const pieLayout = {
    width: 900,
    height:600,
    font: {
      size: 20
    },
    colorway:['#fa6e6e', '#ea6589', '#cf659e', '#ac68ab', '#846bae', '#5d6ca7', '#3a6a98', '#236483', '#215d6d', '#2a5458'],
    title: 'top 10 subregions for the selected energy in Twh',
    
  
    margin: { t: 100, l: 100, r: 100, b: 100 },
  };



// Loop through the data to extract the necessary information for the bubble chart
mapData.forEach(function(item) {
 
  let alpha3 = item.alpha3;
  let quantity = item.quantity;
  let year = item.year;

  bubbleChartData.push({ alpha3: alpha3, quantity: quantity, year: year });
});

// Set the bubble chart parameters
const bubbleChart = [{
  x: bubbleChartData.map(function(item) { return item.year; }),
  y: bubbleChartData.map(function(item) { return item.quantity; }),
  mode: 'markers',
  marker: {
    size: bubbleChartData.map(function(item) { return item.quantity; }),
    sizemode: 'area',
    sizeref: 100,
    color: bubbleChartData.map(function(item) { return item.quantity; }),
    colorscale: 'Electric',
    colorbar: {
      title: 'Quantity'
    }
  },
  text: bubbleChartData.map(function(item) { return item.alpha3; })
}];

// Set the size of the chart visualization and title
const bubbleLayout = {
  width: 1500,
  height: 500,
  title: 'Bubble Chart for Energy Consumption',
  geo: {
    projection: {
      type: 'equirectangular'
    },
    
  }
};

// Plot the bubble chart
Plotly.newPlot('bar', barChart, barLayout);
Plotly.newPlot('pie', pieChart, pieLayout);
Plotly.newPlot('bubble', bubbleChart, bubbleLayout);
}