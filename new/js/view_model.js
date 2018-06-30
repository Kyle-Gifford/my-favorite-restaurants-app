// ViewModel

var AppViewModel = function(){

  this.init = function(self){
    self.setBindings(self);
  }

  // Sets up the bindings to the view for KnockoutJS
  this.setBindings = function(self){
    self.activeItem = ko.observable({"yelpDisc": "Connecting to Yelp server", current: true});
    self.textInFilter = ko.observable("");
    self.locs_arr = ko.observableArray();
    self.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);
    self.markersSearched = 0;
    self.yelpReviewCalls = 0;
    self.yelpDetailsCalls = 0;
  }

  this.googleLoaded = function(){
    f.initMap(window.i.styles);
    f.getGeocodes();
  }

  this.gotGeocode = function(c, modelobj){
    f.addLocToVM(c, modelobj);
    f.getMarker(c, modelobj);//todo
    f.getYelp(c, modelobj, f, model, vm);//todo
  }

  this.getMarkers = function(){
    f.addMarkersToObj()
  }

  this.handleMenuItemClick = function(){
    f.bounceAndToggleMarker(this.marker);
  }

  this.handleMarkerClick = function(marker){
    f.bounceAndToggleMarker(marker);
  }

  this.toggleInfoWindow = function(marker){
    if (model.locs[marker.coords].infowindow.map) {
      model.locs[marker.coords].infowindow.close();
    } else {
      model.locs[marker.coords].infowindow.open(model.map);
    }
  }

  this.firstYelpObtained = function(o){
    var obj = this.activeItem();
    obj["yelpDisc"] = '';
    this.activeItem(obj);
  }

  this.keyPressed = function(){
    f.filterMarkers();
  }

  this.handleMenuClick = function(){
    vm.dropdownVisible(!vm.dropdownVisible());
  }


}


//for last js file to load:
var initialization_sequence = function(){
  if ((!typeof initialize_static_data === "function") || (!typeof initialize_model === "function")) {
    return false;
  } else {
    window.initialize_static_data();
    window.initialize_model();
    window.vm = new AppViewModel();
    vm.init(vm)
  };};


if (typeof initialization_sequence == 'function') {
    initialization_sequence();
}
