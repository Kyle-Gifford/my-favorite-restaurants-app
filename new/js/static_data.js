
var Functions = function(){

  this.filterMarkers = function() {

    for (var i = 0; i < viewmodel.markers_arr().length; i++){
      var name = viewmodel.markers_arr()[i].title.toLowerCase();
      var filter = viewmodel.textInFilter().toLowerCase();
      console.info('nf', name, filter);
      if (name.indexOf(filter) != -1 && (filter.length > 0)){
        viewmodel.markers_arr()[i].setVisible(false);
        viewmodel.markers_arr()[i].koVisible(false);
      } else {
        viewmodel.markers_arr()[i].setVisible(true);
        viewmodel.markers_arr()[i].koVisible(true);
      }
    }
  }

  this.refreshMarker = function(markerObj){
    if (markerObj["yelp"] && markerObj.yelp["name"]) {
      markerObj.marker.setTitle(markerObj.yelp.name);
      markerObj.marker.koTitle(markerObj.yelp.name);
      markerObj.marker["yelp_data"] = markerObj["yelp"];

      markerObj.marker.setVisible(true);
      markerObj.marker.koVisible(true);


    }
    return markerObj;
  }


  this.refreshMarkers = function(){

    for (var marker in model.markers_obj){
      this.refreshMarker(model.markers_obj[marker]);
    }
    this.rmcb();
    return model.markers_obj;
  }
  this.rmcb = function(){

  }


  this.addYelpInfo = function(restaurant){
    var token = 'Bearer ' + model.keys.yelp_token;
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        headers: {'Authorization': token},
        dataType: "json",
        data: {
            location: restaurant.geocode.formatted_address,
            latitude: restaurant.position.lat,
            longitude: restaurant.position.lng,
            radius: 50,
            sort_by: "best_match",
            limit: 1
        },
        success: function( response ) {
          if (response["businesses"]) {
            model.markers_obj[restaurant.posString]["yelp"] = response["businesses"][0];
            viewmodel.gotYelp(model.markers_obj[restaurant.posString])
          } else {
            console.error(('yelp unable to find ' + restaurant.geocode.formatted_address))
          }

          }
    });
  };

  this.addMarkersToObj = function(){
    var placesService = new google.maps.places.PlacesService(model.map);
    var obj = model.markers_obj;
    for (var pos in obj){
      var markerObj = {};
      obj[pos]["marker"] = f.getMarkerFromPos(pos);
      viewmodel.markers_arr.push(obj[pos]["marker"]);
    }
    return f.markersAdded(obj);
  }
  this.markersAdded = function(obj){
    this.refreshMarkers();
    return obj;
  }

  this.getMarkerFromPos = function(pos){
    var place = model.markers_obj[pos];
    var position = place.position;
    var lat = place.position.lat;
    var lng = place.position.lng;

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      title: place.geocode.formatted_address,
      map: model.map,
      visible: false
    });
    marker.addListener('click', viewmodel.handleMarkerClick);
    marker["gAddress"] = marker.title;
    marker.title = place.userTitle;
    marker.koTitle = ko.observable(place.userTitle);
    marker.koVisible = ko.observable(marker.getVisible());
    marker["coords"] = pos;
    return marker;
  }

  this.gotGeocodes = function(){
    if (model.map.data){
      viewmodel.getMarkers();
    }

  };
  this.getGeocodes = function(){
    window.geocoder = new google.maps.Geocoder();
    window.requests_to_make = i.fav_strings.length;
    window.requests_made = 0
    i.fav_strings.forEach(function(spot){
      f.getGeocode(spot);
    });
  };

  this.ggccb = function(current){
    viewmodel.getYelp(current);
    return current;
    //add Yelp here
  }
  this.getGeocode = function(spot){
    var out;
    window.geocoder.geocode({'address': spot}, function(results, status){
      var current = results[0];
      window.requests_made += 1;
      if (current.place_id){
        out = current;
        var lat = current.geometry.location.lat();
        var lng = current.geometry.location.lng();
        var position = {lat: lat, lng: lng};
        var posString = JSON.stringify(position);
        model.places_arr.push(current.place_id);
        model.markers_obj[posString] = {};
        model.markers_obj[posString]['geocode'] = current;
        model.markers_obj[posString]['position'] = position;
        model.markers_obj[posString]['userTitle'] = spot;
        model.markers_obj[posString]['posString'] = posString;
        f.ggccb(model.markers_obj[posString]);

      } else {
        console.error('unable to find' + spot);
      }
      if (window.requests_made == window.requests_to_make) {
        viewmodel.geoCodesLoaded = true;
        f.gotGeocodes();
      }
    });
    return out;
  }

  this.initMap = function(styles, callback) {
    var initial_zoom = 11;
    if (window.innerWidth < 330 ){
      initial_zoom = 10.5;
    }
    model.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.685839, lng: -122.366792},
      zoom: initial_zoom,
      styles: styles,
      mapTypeControl: false,
    });
    if (model.geocodesLoaded){
     viewmodel.getMarkers();
    }
  };
  this.loadGoogle = function(key){
      var tag = document.createElement('script');
      tag.async = true;
      tag.defer = true;
      tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ key +'&v=3&callback=viewmodel.googleLoaded';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };


}


var Info = function(){
  this.fav_strings =  ['Gracias Madre, Mission St', 'El Castillito, Church St, San Francisco', 'Las Pencas, South San Francisco'];

  // this.fav_strings = ['Curry Up Now, San Mateo', 'El Castillito, Church St, San Francisco', 'Souvla, Hayes St, San Francisco', 'Las Pencas, South San Francisco', "Tony's Pizza, north beach sf"]

  this.styles = [
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
};

var initialize_static_data = function() {
  window.i = new Info();
  window.f = new Functions();
};

if (typeof initialization_sequence == 'function') {
    initialization_sequence();
}

