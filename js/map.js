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
      zoom: 7
    });

    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);


    var oppMap = new google.maps.Map(document.getElementById('opp-map'), {
      zoom: 7
    });
    geocodeOppAddress(geocoder, oppMap);
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

function geocodeOppAddress(geocoder, resultsMap) {
  var address = $("#address").val();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var oppAddLat = -1 * (results[0].geometry.location.lat());
      var oppAddLng = -1 * (180 - (results[0].geometry.location.lng()));
      resultsMap.setCenter({lat: oppAddLat, lng: oppAddLng});
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}