
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
    f.toggleInfoWindow(this)
    //toggleInfoWindow
  }

  this.handleMarkerClick = function(marker, infowindow){
    console.log('VinV : ');
    console.log(marker);
    console.log('VthisV : ');
    console.log(infowindow);
    var coords = self.coords;
    f.toggleInfoWindow(infowindow);
    // f.toggleInfoWindow(self);
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
