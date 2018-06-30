
var Functions = function(){

  this.addMarker = function(marker){
    model.locs[marker.coords]["marker"] = marker;
    model.locs[marker.coords].geodata.geovisible = ko.observable(model.locs[marker.coords]["marker"].visible);
    var found = false;
    var j = 0;
    while ( j < vm.locs_arr().length && !found){
      if (vm.locs_arr()[j].coords === marker.coords){
        found = true;
        vm.locs_arr()[j].marker = model.locs[marker.coords]["marker"];
      }
    }
    if (vm.markersSearched == i.fav_strings.length){
      ko.applyBindings(vm);
    }
    f.filterMarkers();
  }
  this.bounceAndToggleMarker = function(marker){
    marker.setAnimation(null);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function(){
      marker.setAnimation(null);
      vm.toggleInfoWindow(marker);
    }, 600);
  };
  this.getMarker = function(pos){
    vm.markersSearched ++;
    var placesService = new google.maps.places.PlacesService(model.map)
    var place = model.locs[pos]
    var lat = place.geodata.geometry.location.lat()
    var lng = place.geodata.geometry.location.lng()
    var infowindow = new google.maps.InfoWindow({
      content: 'loading yelp data...',
      position: {lat: lat, lng: lng}
    });
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      title: place.geodata.userTitle,
      map: model.map,
      visible: false
    })
    place["infowindow"] = infowindow;
    marker.addListener('click', function() {
      vm.handleMarkerClick(marker, infowindow);
    });
    marker["coords"] = pos
    return this.addMarker(marker);
  }
  this.addLocToVM = function(coords){
    vm.locs_arr.unshift({coords: model.locs[coords]["coords"]});
    vm.locs_arr()[0]["geodata"] = model.locs[coords].geodata;
    vm.locs_arr()[0]["yelpDisc"] = ko.observable(model.locs[coords].geodata.userTitle);
    model.locs[coords]["yelpDisc"] = ko.observable(vm.locs_arr()[0]["yelpDisc"]());
  }
  this.addGeocode = function(code, query){
    window.requests_made += 1;
    var latlng = JSON.stringify({lat: code.geometry.location.lat(), lng: code.geometry.location.lng()});
    var obj = {"geodata": code}
    obj["geodata"]["userTitle"] = query;
    model.locs[latlng] = obj;
    model.locs[latlng]["coords"] = latlng;
    model.locs[latlng]["geodata"]["visible"] = false;
    return vm.gotGeocode(latlng, model.locs[latlng]);
  }
  this.getGeocode = function(spot){
    window.geocoder.geocode({'address': spot}, function(results, status){
      out = results[0]
      out["geovisible"] = ko.observable(false);
      out["koTitle"] = ko.observable(spot);
      if (!out.place_id){
        console.error('unable to find' + spot)
      } else {
        return f.addGeocode(out, spot);
      }
    })
  }
  this.getGeocodes = function(){
    window.geocoder = new google.maps.Geocoder()
    window.requests_to_make = i.fav_strings.length
    window.requests_made = 0
    i.fav_strings.forEach(function(spot){
      f.getGeocode(spot);
    })
  }
  this.filterMarkers = function() {
    vm.locs_arr().forEach(function(loc){
      var name = model.locs[loc["coords"]].marker.title.toLowerCase();
      var filter = vm.textInFilter().toLowerCase();
      if (name.indexOf(filter) == -1 && (filter.length > 0)){
        model.locs[loc["coords"]].marker.setVisible(false)
        model.locs[loc["coords"]].infowindow.close();
        loc.geodata.geovisible(false);
      } else {
        model.locs[loc["coords"]].marker.setVisible(true)
        loc.geodata.geovisible(true);
      }
    });
  };
  this.refreshMarker = function(obj){
    if (obj.marker && obj["yelp"] && obj.yelp["name"]) {
      console.log('VmoV : ')
      console.log(obj)
      obj.marker.setTitle(obj.yelp.name)
      obj.marker["yelp_data"] = obj["yelp"]
      vm.markers()[obj["posString"]].marker.setVisible(true)
    }
    return obj
  }
  this.refreshMarkers = function(){

    for (var marker in vm.markers()){
      this.refreshMarker(vm.markers()[marker])
    }
    this.rmcb()
    return vm.markers()
  }
  this.rmcb = function(){
  }
  this.initMap = function(styles, callback) {
    var initial_zoom = 11
    if (window.innerWidth < 330 ){
      initial_zoom = 10.5
    }
    model.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.685839, lng: -122.366792},
      zoom: initial_zoom,
      styles: styles,
      mapTypeControl: false,
    })
    if (model.geocodesLoaded){
     vm.gotGeocodes()
    }
  }
  this.getYelp = function(c, o, f, model, vm){
    var token = 'Bearer ' + model.keys.yelp_token
    var request_obj = {
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        data: {
          location: o.geodata.userTitle,
          // location: 'zzzzzzzzz',
          latitude: o.geodata.geometry.location.lat(),
          longitude: o.geodata.geometry.location.lng(),
          radius: 10,
          // radius: 1,
          sort_by: "best_match",
          limit: 1
        },
        headers: {'Authorization': token},
        error: function(xhr,status,error){
          o.infowindow.setContent('unable to retreive yelp data');
          window.alert(('unable to retreive yelp data for: ' + o.geodata.userTitle))
          return "yelp unable to retreive location";
        },
        dataType: "json"}
    $.ajax(request_obj).done(function(d){
      if (d["businesses"] && d["businesses"].length) {
        vm.yelpReviewCalls ++;
        if (vm.yelpReviewCalls == 1) {
          vm.firstYelpObtained(o);
        }
        return f.addYelp(c, o, d);
      } else {
        o.infowindow.setContent('unable to retreive yelp data');
        window.alert(('unable to retreive yelp data for: ' + o.geodata.userTitle))
        return "yelp unable to retreive location";
      }
    });
  };
  this.addYelp = function(c, o, d){

    o.marker["yelp"] = d["businesses"][0];
    o.infowindow.setContent(o.marker["yelp"].name + "<br>" + "Yelp rating : " + o.marker["yelp"].rating);
    o.marker.setTitle(o.marker["yelp"].name);
    o.geodata.koTitle(o.marker["yelp"].name);
    return o.marker.yelp;
  }

};

var Info = function(){

  this.fav_strings = ['Las Pencas, South San Francisco'];

  // this.fav_strings =  ['Gracias Madre, Mission St', 'El Castillito, Church St, San Francisco', 'Las Pencas, South San Francisco'];

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
};

