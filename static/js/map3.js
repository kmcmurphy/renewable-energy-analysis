d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function (countries) {
        let borders = L.geoJSON(countries, {
            fillColor: "blue",
            fillOpacity: .5,
            interactive: false,
            color: "lime",
            weight: 2
          });
      //   Create a map tile layer (optional)
    let streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
      noWrap: true
    })
    let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom:2,
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
      maxZoom:2,
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
    // Load the ISO data for the selected year
    d3.json(`http://127.0.0.1:5000/api/v1.0/energy/${selectedValue}`)
      .then(function (isoData) {
        const yearSlider = document.getElementById("year-slider");
        yearSlider.addEventListener("input", function() {
          let selectedYear = yearSlider.value;
          // update the map based on the selected year
        
        const selectedYearData = isoData.find(d => d.year === selectedYear);
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
    alpha3: alpha3,
    coordinates: coordinates,
    value: 0
  };
});

// Map the ISO data to the alpha3 codes and values
// Map the ISO data to the alpha3 codes and values
selYear = 2018;
isoData.forEach(({alpha3, quantity, year}) => {


  if (alphaCoordinates[alpha3] && year == selYear) {
    alphaCoordinates[alpha3].alpha3 = alpha3;
    alphaCoordinates[alpha3].value = quantity;
    alphaCoordinates[alpha3].year = year;
  }

});

// Now you have an object that combines alpha3 codes, coordinates, and ISO values
console.log(`Data for Year`, `${selectedYear}`,alphaCoordinates);
let alph = alphaCoordinates.alpha3;
let quan = alphaCoordinates.quantity;
let when = alphaCoordinates.year;
console.log(`Alpha`, alph)
console.log(`Quantity`,quan)
console.log(`When`, when)
console.log(`features`, alphaCoordinates.features)
});
});
});
    })