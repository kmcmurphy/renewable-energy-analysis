
// Add event listener to detect when a new option is selected
select.addEventListener("change", function() {
    // Get the selected value
    let selectedValue = select.value;
d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function (countries) {
    let borders = L.geoJSON(countries, {
        fillColor: "orange",
        fillOpacity: 0,
        interactive: false,
        color: "magenta",
        weight: 2
      });
console.log(`Country Data`, countries)
    // Load your data from API
d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`).then(function (data) {
    console.log(`selected data`,data)

//   Create a map tile layer (optional)
let streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
    noWrap: true
})
let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
let baseMaps = {
    "Street Map": streetmap,
};
  // Create the overlay maps
  let overlayMaps = {
    "Country Borders:": borders,
    "World Map": OpenTopoMap
 
  };
      // Create a Leaflet map
  // Create the loading map
  let map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [streetmap, borders]
  });
  // Create a layer control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    color: "gray"
  }).addTo(map);

borders.addTo(map)


})})})