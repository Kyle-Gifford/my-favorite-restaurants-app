
var AppViewModel = function(){

  this.init = function(self){
    self.setBindings(self);
  }

  this.setBindings = function(self){
    self.activeItem = ko.observable({"yelpDisc": "Connecting to Yelp server", current: true});
    self.textInFilter = ko.observable("")
    self.locs_arr = ko.observableArray()
    self.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0)
    self.markersSearched = 0;
    self.yelpReviewCalls = 0;
    self.yelpDetailsCalls = 0;
  }

  this.googleLoaded = function(){
    f.initMap(window.i.styles)
    f.getGeocodes()
  }


  this.gotGeocode = function(c, o){
    f.addLocToVM(c, o);
    f.getMarker(c, o);//todo
    f.getYelp(c, o, f, model, vm);//todo
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
      model.locs[marker.coords].infowindow.close()
    } else {
      model.locs[marker.coords].infowindow.open(model.map);
    }
  }

  this.firstYelpObtained = function(){
    var obj = this.activeItem()
    obj["yelpDisc"] = 'Retreiving yelp details...';
    this.activeItem(obj);
  };

  this.addYelpDetails = function(){
    //todo
  }

  this.yelpRatingAdded = function(loc){
    //todo call this function when yelp rating added
    //todo if its first yelp info change menuinfo 'loading message' to 'Yelp discriptions loading'
    //if active item display
  }

  this.yelpDiscriptionAdded = function(loc){
    //todo call this function when yelp description added
    //todo if first description clear menuinfo
  }








  this.keyPressed = function(){
    f.filterMarkers()
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
