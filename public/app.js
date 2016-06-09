
window.onload = function () {
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
      main(countries);
    }
  };
  request.send();

};

var main = function (countries) {
  var cached = localStorage.getItem("selectedCountry");
  var selected = countries[0];
  if(cached){
    selected = JSON.parse(cached);
    document.querySelector('#countries').selectedIndex = selected.index;
  }
  var map = new Map( {lat:selected.latlng[0], lng: selected.latlng[1]}, 6 );
  console.log(map);
  populateSelect(countries, map);
  updateDisplay(selected, map);
  document.querySelector('#info').style.display = 'block';
};

var populateSelect = function (countries, map) {
  var parent = document.querySelector('#countries');
  countries.forEach(function (item, index) {
    item.index = index;
    var option = document.createElement("option");
    option.value = index.toString();
    option.text = item.name;
    parent.appendChild(option);
  });

  parent.style.display = 'block';
  parent.addEventListener('change', function (e) {
    var index = +this.value;
    var country = countries[index];
    console.log(map, "call back map");
    updateDisplay(country, map);
    localStorage.setItem("selectedCountry",JSON.stringify(country));
  });

};

var updateDisplay = function (country, map) {
  var tags = document.querySelectorAll('#info p');
  tags[0].innerText = country.name;
  tags[1].innerText = country.population;
  tags[2].innerText = country.capital;

  var div = document.querySelector( '#map' );
  console.log(country.latlng);
  console.log("other map", map);
  map.googleMap.setCenter({lat: country.latlng[0], lng: country.latlng[1]});
};
