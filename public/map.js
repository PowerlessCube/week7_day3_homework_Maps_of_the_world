// TODO: - Display a map centered on the selected country.

var Map = function( latLng, zoom ) {
  this.googleMap = new google.maps.Map( document.getElementById( 'map' ), {
    center: latLng,
    zoom: zoom
  });

  // this.resetCenter = function( latlng ) {
  //   this.googleMap.setCenter( latlng );
  // };

  // TODO: - Add a marker to the country.

  // TODO: - Add an info window to the marker displaying the country statistics.

};
