// Create a new Leaflet map centered on the world
var map = L.map('map').setView([0, 0], 2);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Load the countries.geojson file
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
  .then(response => response.json())
  .then(data => {
    // Create a Leaflet geoJSON layer from the countries.geojson data
    L.geoJSON(data, {
      // Use the alpha3 code as the layer ID
      // This will allow us to easily access and manipulate the layer later
      style: function(feature) {
        return {
          color: 'white',
          fillColor: '#2c7bb6',
          fillOpacity: 0.7,
          weight: 1,
        };
      },
      onEachFeature: function(feature, layer) {
        // Add the alpha3 code as a tooltip to the layer
        layer.bindTooltip(feature.properties.alpha3);
        // Add a data property to the layer for the alpha3 code
        layer.data = {
          alpha3: feature.properties.alpha3,
        };
      },
      // Use the alpha3 code as the layer ID
      // This will allow us to easily access and manipulate the layer later
      // Note that the alpha3 code is converted to lower case to match the layer ID format
      // e.g. layer ID for United States will be "usa" instead of "USA"
      id: feature => feature.properties.alpha3.toLowerCase(),
    }).addTo(map);

    // Fetch your data from your API
    fetch('https://your-api-url.com/data')
      .then(response => response.json())
      .then(data => {
        // Loop through the data and map it to the geoJSON layers
        data.forEach(item => {
          // Select the layer with the matching alpha3 code
          var layer = map.hasLayer(LayerGroup) ? map.getLayer(LayerGroup).getLayer(item.alpha3.toLowerCase()) : null;
          if (layer) {
            // Add the data to the layer
            layer.data = {
              alpha3: item.alpha3,
              value: item.value,
            };
            // Update the layer style based on the data
            layer.setStyle({
              fillColor: getColor(item.value),
            });
          }
        });
      });
  });

// Define a function to get the color based on the value
function getColor(value) {
  // Your logic for determining the color based on the value
  // For example:
  if (value < 100) {
    return '#fee0d2';
  } else if (value < 1000) {
    return '#fc9272';
  } else if (value < 10000) {
    return '#ef3b2c';
  } else {
    return '#990000';
  }
}
