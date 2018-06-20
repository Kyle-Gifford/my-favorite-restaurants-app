// TODO: remove cl and all logs
var cl = function(i){
  console.log(i);
};

cl(zomato_api_key);


var fav_strings = ['Curry Up Now, San Mateo', 'El Castillito, Church St, San Francisco', 'Souvla, Hayes, San Francisco'];

var geocoder;
var map;

var addZomatoRatingtoLocs = function(){
  var run = function(){
    model.locs.forEach(function(loc){
      addZomatoIds();
    });
    cl(model.locs);
  };
  window.setTimeout(run, 500);

  var addZomatoIds = function(){
    //model.locs[0]['foof'] = 'weeee';
  };

}

var getLocs = function(){
  geocoder = new google.maps.Geocoder();
  var requests = [];
  fav_strings.forEach(function(name){
    requests.push({address: name})
  });
  function geocodes_complete_callback(){
    cl('all geocodes complete');
    model.addZomatoRatingtoLocs();
  }
  var geocodes_completed = 0;
  requests.forEach(function(request){
    geocoder.geocode( { 'address': request.address}, function(results, status) {
      current = results[0];
      var placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({
          query: request.address
          // bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // createMarkersForPlaces(results);
            current['name'] = results[0].name;
            current['position'] = {lat: current.geometry.location.lat(), lng: current.geometry.location.lng()}
            model.locs.push(current)

          }
        });
      geocodes_completed ++;
      if (geocodes_completed >= requests.length){geocodes_complete_callback();};
  });
  });
};

var loadGoogle = function(){
  var tag = document.createElement('script');
  tag.async = true;
  tag.defer = true;
  tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ google_api_key +'&v=3&callback=googleLoadedCallback';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};


function initMap(styles) {
  console.log('docwidth', window.innerWidth);
  var initial_zoom = 11;
  if (window.innerWidth < 330 ){
    initial_zoom = 10.5;
  }
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.685839, lng: -122.366792},
    zoom: initial_zoom,
    styles: styles,
    mapTypeControl: false,
  });
};

function googleLoadedCallback(){
  initMap(styles);
  getLocs();
};






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
