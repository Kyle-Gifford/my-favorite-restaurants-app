var app = window.app || {};

// oldV
// yelp_token, google_api_key
// TODO: remove cl and all logs

var cl = function(i){
  console.log(i);
};
cl('data');
// --- helper functions


var filterMarkers = function(appview) {
  var filter = appview.textInFilter();
  console.log(filter);

  for (var i = 0; i < appview.markers.length; i++){
    var name = appview.markers[i].title;
    if (appview.markers[i].title.search(filter) > -1 && (filter.length > 0)) {
      appview.markers[i].setVisible(false);
      appview.visibleMarkers()[i].visible(false);
    } else {
      appview.markers[i].setVisible(true);
      appview.visibleMarkers()[i].visible(true);
    }
  }
}

function addYelpRating(restaurant, yelp_api){
  var token = 'Bearer ' + yelp_api;
  $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
      headers: {'Authorization': token},
      dataType: "json",
      data: {
          term: restaurant.name,
          location: restaurant.formatted_address
      },
      success: function( response ) {
        model.yelp_success_count ++;
        restaurant["yelp_rating"] = response.businesses[0].rating;
        restaurant["visibility"] = 'inherit';
        restaurant["visible"] = ko.observable(true);
        //attempt
        appview.visibleMarkers()[restaurant.name] = restaurant;

        //old
        // appview.visibleMarkers.unshift(restaurant);

        els = document.getElementsByTagName("area");
        if (els.length > 0){
          cl(els.length);
          for (var i = 0; i < els.length; i++){
            cl(i);
            els[i].setAttribute("data-bind", "click: handleMarkerClick");
          }
        }
        if (model.yelp_success_count == model.locs.length){
          ko.applyBindings(appview);
        }
        }
  });
};

var addYelpRatingstoLocs = function(model){
  var i = model.locs.length - 1;
  model.locs.forEach(function(loc){
    addYelpRating(loc, model.yelp_api_key);
    i++;
  });

};


function getLocs_complete_callback(model){
  model.addYelpRatingstoLocs(model);
}

var getLocs = function(){
  geocoder = new google.maps.Geocoder();
  var requests = [];
  fav_strings.forEach(function(name){
    requests.push({address: name})
  });

  model.locs = [];
  requests.forEach(function(request){
    var current = {};
    geocoder.geocode( { 'address': request.address}, function(results, status) {
      current = results[0];
      current["position"] = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
      var placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({
          query: request.address
        }, function(iresults, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            current['name'] = iresults[0].name;
            var marker = model.getMarker(google, current["position"], current["name"]);
            model.addMarker(marker, window.map, model.markers)
            model.locs.unshift(current);
            if (appview.restaurants) {
              appview.restaurants().unshift(current["name"]);
            } else {
              model.restaurants.unshift(current["name"]);
            }
            var restaurant = model.locs[model.locs.length - 1];
            if (model.locs.length >= requests.length){ getLocs_complete_callback(model);};
          }
        });
  });
  });
};

var addMarker = function(marker, map, markers){
  markers.unshift(marker);
  markers[0].setMap(map);
}

var getMarker = function(google, position, title){
  return new google.maps.Marker({
    position: position,
    title: title
  });
};



var loadGoogle = function(api_key){
  var tag = document.createElement('script');
  tag.async = true;
  tag.defer = true;
  tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ api_key +'&v=3&callback=googleLoadedCallback';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};


function initMap(styles) {
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
  model.initMap(styles);
  model.getLocs();
};


// -- data

var fav_strings = ['Gracias Madre, Mission St', 'El Castillito, Church St, San Francisco', 'Las Pencas, South San Francisco'];

// 'Curry Up Now, San Mateo', 'El Castillito, Church St, San Francisco', 'Souvla, Hayes St, San Francisco', 'Las Pencas, South San Francisco',

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
