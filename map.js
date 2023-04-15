// Load the geojson data
d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function (data) {
console.log(data)
    // Load the energy data
// Load the energy data and filter to only include years from 2000 and up
d3.csv("https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv").then(function (energyData) {

  


console.log(energyData)
        // Create a Leaflet map centered on the world
        let map = L.map('map').setView([0, 0], 3);

        // Add a tile layer for the map background
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Loop through the features and add the energy data to the corresponding country
data.features.forEach(function (feature) {
  // Find the energy data for the country and year
  let countryData = energyData.find(function (d) {
    return d.iso_code === feature.properties.ISO_A3;
  });
  if (countryData) {
    feature.properties.energyUsage = parseFloat(countryData.energy_per_gdp);
  }
});


        // Add the countries to the map
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    fillColor: getColor(feature.properties.energyUsage),
                    weight: 1,
                    color: 'lime',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<b>" + feature.properties.ADMIN + "</b><br>" +
                    "Energy usage per GDP: " + feature.properties.energyUsage + "<br>");
            }
        }).addTo(map);

        // Add a legend to the map
        let legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 10, 20],
                labels = ['<strong>Energy usage per GDP</strong>'],
                from, to;
            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];
                labels.push(
                    '<i style="background:' + getColor(from + 1) + '"></i> ' +
                    from + (to ? '&ndash;' + to : '+'));
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(map);

    });

});

function getColor(value) {
    if (value === undefined) {
        return 'grey';
    } else if (value < 10) {
        return 'green';
    } else if (value < 20) {
        return 'orange';
    } else {
        return 'red';
    }
}
