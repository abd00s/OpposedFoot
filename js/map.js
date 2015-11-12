var map;
var oppMap;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('search-map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
//   oppMap = new google.maps.Map(document.getElementById('opp-map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }

$("#address").keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    var userInput = $("#address").val();
    console.log( "Handler for .keypress() called." );
    console.log(userInput)
    var map = new google.maps.Map(document.getElementById('search-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);

    oppMap = new google.maps.Map(document.getElementById('opp-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
});

function geocodeAddress(geocoder, resultsMap) {
  var address = $("#address").val();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}