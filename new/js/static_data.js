var app = window.app || app || {};



var Functions = function(){

  this.addMarkersToObj = function(){
    app.placesService = new google.maps.places.PlacesService(app.model.map);
    var obj = app.model.markers_obj;
    for (var id in obj){
      obj[id]["marker"] = app.f.getMarkerFromId(id);
    }
    return app.f.markersAdded(obj);
  }
  this.markersAdded = function(obj){
    console.log('markers added');
    return obj;
  }

  this.getMarkerFromId = function(id){
    console.log('attempting get marker id: ' + id);
    place = app.model.markers_obj[id];
    var lat = place.geodata.geometry.location.lat();
    var long = place.geodata.geometry.location.lng();
    var position = {lat: lat, lng: long};
    place['position'] = position;
    var marker = new google.maps.Marker({
      position: position,
      map: app.model.map,
      title: place.formatted_address,
    });
    marker.addListener('click', app.viewmodel.handleMarkerClick);
    console.log(marker);
    marker["id"] = id;
    return marker;
  }

  this.gotGeocodes = function(){
    console.log('all geocodes calculated');
    if (app.model.map.data){
      app.viewmodel.getMarkers();
    }

  };
  this.getGeocodes = function(){
    app.geocoder = new google.maps.Geocoder();
    app.requests_to_make = app.i.fav_strings.length;
    app.requests_made = 0
    app.i.fav_strings.forEach(function(spot){
      app.f.getGeocode(spot);
    });
  };

  this.ggccb = function(spot, current){
    console.log('attempted geocode', spot, 'output:', current);
    return current;
  }
  this.getGeocode = function(spot){
    console.log('spot in: ' + spot)
    app.geocoder.geocode({'address': spot}, function(results, status){
      var current = results[0];
      app.requests_made += 1;
      if (current.place_id){
        console.log(current.place_id);
        app.model.places_arr.push(current.place_id);
        app.model.markers_obj[current.place_id] = {};
        app.model.markers_obj[current.place_id]["geodata"] = current;
      } else {
        console.error('unable to find' + spot);
      }
      if (app.requests_made == app.requests_to_make) {
        app.f.gotGeocodes();

      }
      app.f.ggccb(spot, current);
    });
  }

  this.initMap = function(styles, callback) {
    var initial_zoom = 11;
    if (window.innerWidth < 330 ){
      initial_zoom = 10.5;
    }
    app.model.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.685839, lng: -122.366792},
      zoom: initial_zoom,
      styles: styles,
      mapTypeControl: false,
    });
    if (app.model.geocodesLoaded){
     app.viewmodel.getMarkers();
    }
  };
  this.loadGoogle = function(key){
      var tag = document.createElement('script');
      tag.async = true;
      tag.defer = true;
      tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ key +'&v=3&callback=app.viewmodel.googleLoaded';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };


}


var Info = function(){
  this.zip = 94110;
  this.fav_strings =  ['Gracias Madre, Mission St', 'El Castillito, Church St, San Francisco', 'Las Pencas, South San Francisco'];
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

app.i = new Info();
app.f = new Functions();
