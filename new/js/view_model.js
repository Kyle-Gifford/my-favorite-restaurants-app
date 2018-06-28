
var AppViewModel = function(){

  this.init = function(self){
    console.log('VthisV : ');
    console.log(this);
    self.setBindings(self);
  }

  this.setBindings = function(self){
    self.activeItem = ko.observable({"Yelp ratings loading": "", current: true});
    self.textInFilter = ko.observable("")
    self.locs_arr = ko.observableArray()
    self.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0)
    self.markersSearched = 0;
    self.yelpReviewCalls = 0;
    self.yelpDetailsCalls = 0;
  }

  this.yelpRatingAdded = function(loc){
    //todo call this function when yelp rating added
    //todo if its first yelp info change menuinfo 'loading message' to 'Yelp discriptions loading'
  }

  this.yelpDiscriptionAdded = function(loc){
    //todo call this function when yelp description added
    //todo if first description clear menuinfo
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
    f.getYelp(c, o, f, model, vm);//todo
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
