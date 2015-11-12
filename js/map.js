var map = new google.maps.Map(document.getElementById('search-map'), {
  zoom: 7
});

var oppMap = new google.maps.Map(document.getElementById('opp-map'), {
  zoom: 7
});

var autocomplete;

var geocoder = new google.maps.Geocoder();

var markers = [];

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')),
    {types: ['geocode']});
  autocomplete.addListener('place_changed', clickResult);
}

google.maps.event.addDomListener(window, 'load', initAutocomplete);

function clickResult() {
  deleteMarkers();
  geocodeAddress(geocoder, map);
  geocodeOppAddress(geocoder, oppMap);
}

$("#address").keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    var userInput = $("#address").val();

    deleteMarkers();
    geocodeAddress(geocoder, map);


    geocodeOppAddress(geocoder, oppMap);
  }
});

function geocodeAddress(geocoder, resultsMap) {
      $("#search-map").css("visibility", "visible");
  var address = $("#address").val();

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      addMarker(map, results[0].geometry.location)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodeOppAddress(geocoder, resultsMap) {
  $("#opp-map").css("visibility", "visible");
  var address = $("#address").val();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var oppAddLat = -1 * (results[0].geometry.location.lat());
      var oppAddLng = -1 * (180 - (results[0].geometry.location.lng()));
      resultsMap.setCenter({lat: oppAddLat, lng: oppAddLng});
      addMarker(oppMap, {lat: oppAddLat, lng: oppAddLng})
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

$(".mdi-navigation-close").click(function(){
  $("#address").val("");
})