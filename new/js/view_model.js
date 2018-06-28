
var AppViewModel = function(){

  this.init = function(self){
    console.log('VthisV : ');
    console.log(this);
    self.setBindings(self);
  }

  this.setBindings = function(self){
    self.textInFilter = ko.observable("")
    self.locs_arr = ko.observableArray()
    self.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0)
    self.markersSearched = 0;
  }

  this.googleLoaded = function(){
    f.initMap(window.i.styles)
    f.getGeocodes()
  }

  this.handleMenuItemClick = function(){
    f.bounceAndToggleMarker(this.marker);
  }

  this.toggleInfoWindow = function(marker){
    if (model.locs[marker.coords].infowindow.map) {
      model.locs[marker.coords].infowindow.close()
    } else {
      model.locs[marker.coords].infowindow.open(model.map);
    }
  }

  this.handleMarkerClick = function(marker){
    f.bounceAndToggleMarker(marker);
  }


  this.gotGeocode = function(c, o){
    f.addLocToVM(c, o);
    f.getMarker(c, o);//todo
    f.getYelp(c, o);//todo
  }

  this.keyPressed = function(){
    f.filterMarkers()
  }

  this.getMarkers = function(){
    f.addMarkersToObj()
  }

  this.menuToggle = function(){
    //todo
  }

  this.handleMenuClick = function(){
    vm.dropdownVisible(!vm.dropdownVisible())
  }

};


//for last js file to load:
var initialization_sequence = function(){
  if ((!typeof initialize_static_data === "function") || (!typeof initialize_model === "function")) {
    return false;
  } else {
    window.initialize_static_data();
    window.initialize_model();
    window.vm = new AppViewModel();
    vm.init(vm)
  }
};


(initialization_sequence || Function)();
