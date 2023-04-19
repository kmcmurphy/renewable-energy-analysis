d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function (countries) {
    let borders = L.geoJSON(countries, {
        fillColor: "magenta",
        fillOpacity: 0,
        interactive: false,
        color: "cyan",
        weight: 2
      });
  //   Create a map tile layer (optional)
let streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
  noWrap: true
})
let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
maxZoom: 17,
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
noWrap: true
});
let baseMaps = {
  "Street Map": streetmap,
  "World Map": OpenTopoMap
};
// Create the overlay maps
let overlayMaps = {
  "Country Borders:": borders,
  

};
let map = L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers: [streetmap, borders]
});
  // Create a layer control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    color: "gray"
  }).addTo(map);

borders.addTo(map)
  });


select.addEventListener("change", function() {
  // Get the selected value
  let selectedValue = select.value;
  // Load the ISO data
  d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`)
    .then(function (isoData) {
      console.log(`ISO/Alpha3`, isoData);

      // Load the country geojson data
      d3.json('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(function(countryData) {
          // Map the alpha3 codes to their respective coordinates
        // Map the alpha3 codes to their respective coordinates
const alphaCoordinates = {};
countryData.features.forEach(feature => {
  const alpha3 = feature.properties.ISO_A3;
  const coordinates = feature.geometry.coordinates;
  alphaCoordinates[alpha3] = {
    coordinates: coordinates,
    value: 0
  };
});

// Map the ISO data to the alpha3 codes and values
isoData.forEach(({alpha3, quantity}) => {
  if (alphaCoordinates[alpha3]) {
    alphaCoordinates[alpha3].value = quantity;
  }
});

// Now you have an object that combines alpha3 codes, coordinates, and ISO values
console.log(alphaCoordinates);

            })
          })});