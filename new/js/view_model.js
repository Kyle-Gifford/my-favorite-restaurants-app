
var AppViewModel = function(){

  this.keyPressed = function(){
    f.filterMarkers();
  };

  this.textInFilter = ko.observable("");

  this.getMarkers = function(){
    f.addMarkersToObj();
  };

  this.menuToggle = function(){
    //todo
  };

  this.handleMenuClick = function(){
    viewmodel.dropdownVisible(!viewmodel.dropdownVisible());
  };

  this.geocodesLoaded = false;

  this.markers_arr = ko.observableArray();

  this.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);

  this.handleMarkerClick = function(){
    console.info('hmc', this);
    console.info('coords', this.coords);
    var coords = this.coords;
  }

  this.handleMenuItemClick = function(){
    console.info('here', this);
  };

  this.googleLoaded = function(){
    f.initMap(window.i.styles);
    f.getGeocodes();
  };

  this.mapLoaded = function() {
  }

  this.gotYelp = function(restaurant) {
    f.refreshMarker(restaurant);
  }

  this.getYelp = function(obj){
    f.addYelpInfo(obj);
  }

  this.initialize = function(self){
    f.loadGoogle(model.keys.google_key);
  };
  this.init_callback = function(self){

  };
  var init = function(self){
    self.initialize(self);
    self.init_callback(self);
  };
  init(this);
};


//for last js file to load:
var initialization_sequence = function(){
  if (!initialize_static_data || !initialize_model) {
    return false;
  } else {
    window.initialize_static_data();
    window.initialize_model();
    window.viewmodel = new AppViewModel();
    ko.applyBindings(window.viewmodel);
  }
};


(initialization_sequence || Function)();
