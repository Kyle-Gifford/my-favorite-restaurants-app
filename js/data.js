var fav_strings = ['Curry Up Now, San Mateo', 'El Castillito, San Francisco', 'Souvla, San Francisco'];

var map;

var loadMap = function(){
  console.log('here');
  var tag = document.createElement('script');
  tag.async = true;
  tag.defer = true;
  tag.src = 'https://maps.googleapis.com/maps/api/js?key='+ google_api_key +'&v=3&callback=initMap';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}();


function initMap() {
  console.log('docwidth', window.innerWidth);
  var initial_zoom = 11;
  if (window.innerWidth < 330 ){
    initial_zoom = 10.5;
  }
  // Constructor creates a new map - only center and zoom are required.
  var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    }
  ];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.685839, lng: -122.366792},
    zoom: initial_zoom,
    styles: styles,
    mapTypeControl: false
  });
}
