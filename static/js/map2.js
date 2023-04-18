
// Add event listener to detect when a new option is selected
select.addEventListener("change", function() {
    // Get the selected value
    let selectedValue = select.value;

d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`).then(function (data) {
    const alphaQuantities = {};
    data.forEach(item => {
      const alpha3 = item.alpha3;
      const quantity = item.quantity;
      alphaQuantities[alpha3] = quantity;
    });
    console.log(`quantities`,alphaQuantities);
  });




d3.json('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
.then(function(data) {
  const alphaCoordinates = {};
  data.features.forEach(feature => {
    const alpha3 = feature.properties.ISO_A3;
    const coordinates = feature.geometry.coordinates;
    alphaCoordinates [alpha3] = coordinates;
  });
  console.log(`alpha Cord`,alphaCoordinates );
});
})




// // Add event listener to detect when a new option is selected
// select.addEventListener("change", function() {
//     // Get the selected value
//     let selectedValue = select.value;

//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//     .then(response => response.json())
//     .then(data => {
//       const coordinatesByAlpha3 = {};
//       data.features.forEach(feature => {
//         const alpha3 = feature.properties.ADM0_A3;
//         const coordinates = feature.geometry.coordinates;
//         coordinatesByAlpha3[alpha3] = coordinates;
//       });
//       console.log(coordinatesByAlpha3);
//     });





// d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function (data) {
//   const countries = data;
//   const a3 = data;

//     let borders = L.geoJSON(countries, {
//         fillColor: "orange",
//         fillOpacity: 0.5,
//         interactive: false,
//         color: "lime",
//         weight: 2
//       });
// // Create a GeoJSON layer from the countries data
// let isoLayer = L.geoJson(a3, {

//   style: function(feature) {
//     // Get the alpha 3 code from the feature properties
//    let alpha3Code = feature.properties.ISO_A3; // -- changed this to ISO instead, since alpha 3 didn't come through
//       console.log(alpha3Code)
//     // Find the corresponding data for this country
//    let countryData = data.find(function(d) {
//       return d.alpha3Code === alpha3Code;
//     });
//     console.log(`countrydata`, countryData);
//     // Set the fill color based on the data value
//     if (countryData) {
//       return { fillColor: colorScale(countryData.quantity), weight: 1 };
//     } else {
//       return { fillColor: "#000", weight: 1 }; // Default color if no data is available
//     }
//   },
//   onEachFeature: function(feature, layer) {
//     // Add a popup with the country name
//     layer.bindPopup("<h3>" + feature.properties.ADMIN 
    
//     );
//   }
// });

// console.log(`Country Data`, countries)
//     // Load your data from API
// d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`).then(function (data) {
//     console.log(`selected data`,data)
// //     let energy = data.features



// //   Create a map tile layer (optional)
// let streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
//     noWrap: true

// })
// let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 17,
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
//   noWrap:true,
// });
// let baseMaps = {
//     "Street Map": streetmap,
//     "World Map": OpenTopoMap
// };
//   // Create the overlay maps
//   let overlayMaps = {
//     "Country Borders:": borders,
//     "DaMap": isoLayer
 
//   };
//       // Create a Leaflet map
//   // Create the loading map
//   let map = L.map("map", {
//     center: [39.8283, -98.5795],
//     zoom: 4,
//     layers: [streetmap, borders]
//   });
//   // Create a layer control.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false,
//     color: "gray"
//   }).addTo(map);

// borders.addTo(map)


// })})})




 