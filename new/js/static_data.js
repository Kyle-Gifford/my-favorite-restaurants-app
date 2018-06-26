var app = window.app || app || {};



var Functions = function(){

  this.addYelpRating = function(restaurant){
    var token = 'Bearer ' + app.model.keys.yelp_token;
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        headers: {'Authorization': token},
        dataType: "json",
        data: {
            location: restaurant.geocode.formatted_address,
            latitude: restaurant.position.lat,
            longitude: restaurant.position.lng,
            radius: 30,
            sort_by: "distance"
        },
        success: function( response ) {
          console.log('got yelp', response);
          if (response["businesses"]) {
            app.model.markers_obj[restaurant.posString]["yelp"] = response["businesses"][0];
            app.viewmodel.menuItems.push(app.model.markers_obj[restaurant.posString]);
          } else {
            console.error(('yelp unable to find ' + restaurant.geocode.formatted_address))
          }

          }
    });
  };

  this.addMarkersToObj = function(){
    app.placesService = new google.maps.places.PlacesService(app.model.map);
    var obj = app.model.markers_obj;
        for (var pos in obj){
      var markerObj = {};
      obj[pos]["marker"] = app.f.getMarkerFromPos(pos);
    }
    return app.f.markersAdded(obj);
  }
  this.markersAdded = function(obj){
        return obj;
  }

  this.getMarkerFromPos = function(pos){
    var place = app.model.markers_obj[pos];
    var position = place.position;
    var lat = place.position.lat;
    var lng = place.position.lng;

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: app.model.map,
      title: place.geocode.formatted_address,
    });
    marker.addListener('click', app.viewmodel.handleMarkerClick);
    marker["gAddress"] = marker.title;
    marker.title = place.userTitle;
    marker["coords"] = pos;
        return marker;
  }

  this.gotGeocodes = function(){
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
        app.viewmodel.getYelp(current);
    return current;
  }
  this.getGeocode = function(spot){
        var out;
    app.geocoder.geocode({'address': spot}, function(results, status){
      var current = results[0];
      app.requests_made += 1;
      if (current.place_id){
        out = current;
        var lat = current.geometry.location.lat();
        var lng = current.geometry.location.lng();
        var position = {lat: lat, lng: lng};
        var posString = JSON.stringify(position);
        app.model.places_arr.push(current.place_id);
        app.model.markers_obj[posString] = {};
        app.model.markers_obj[posString]['geocode'] = current;
        app.model.markers_obj[posString]['position'] = position;
        app.model.markers_obj[posString]['userTitle'] = spot;
        app.model.markers_obj[posString]['posString'] = posString;
        app.f.ggccb(spot, app.model.markers_obj[posString]);

      } else {
        console.error('unable to find' + spot);
      }
      if (app.requests_made == app.requests_to_make) {
        app.viewmodel.geoCodesLoaded = true;
        app.f.gotGeocodes();
      }

    });
    return out;
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

app.initialize_static_data = function() {
  app.i = new Info();
  app.f = new Functions();
};


(app.initialization_sequence || Function)();