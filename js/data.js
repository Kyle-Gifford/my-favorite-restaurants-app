var fav_strings = ['Curry Up Now, San Mateo', 'El Castillito, San Francisco', 'Souvla, San Francisco']

var map;

function initMap() {
  console.log('docwidth', window.innerWidth);
  var initial_zoom = 2;
  if (window.innerWidth < 330 ){
    initial_zoom = 13;
  }
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: initial_zoom
  });

  console.log('map loaded');
  strings_to_markers();

}

//helper functions

function strings_to_markers(){
  console.log('strings_to_markers');
};