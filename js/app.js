console.log('app');
var Model = function(){
  this.init = function(api_key){
    var geocoder;
    var map;
    window.map = map;
    window.geocoder = geocoder;
    self.loadGoogle(api_key);
  };
  this.locs = [];
  this.markers = [];
  this.filterMarkers = filterMarkers;
  this.getMarker = getMarker;
  this.addMarker = addMarker;
  this.addYelpRating = addYelpRating;
  this.api_key = config.google_api_key;
  this.yelp_api_key = config.yelp_api_key;
  this.yelp_success_count = 0
  this.fav_strings = fav_strings;
  this.styles = styles;
  this.getLocs = getLocs;
  this.loadGoogle = loadGoogle;
  this.googleLoadedCallback = googleLoadedCallback;
  this.initMap = initMap;
  this.addYelpRatingstoLocs = addYelpRatingstoLocs;
};
model = new Model();
model.init(model.api_key);


var AppViewModel = function(){
  this.init = function(){
    console.log('AppViewModel initializing');
  }
  this.model = model;
  this.textInFilter = ko.observable();
  this.markers = model.markers;
  this.keyHistory = [];
  this.filterMarkers = model.filterMarkers;
  this.visibleMarkers = ko.observableArray(self.markers);
  this.keyPressed = function(data, event){
    self.filterMarkers(window.appview);
    return true;
  }
  this.handleMarkerClick = function(data, event){
    var name = event.target.title || event.target.textContent;
    cl(name);
  };
  this.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);
  this.handleMenuClick = function(self){
    console.log('clicked menu');
    self.dropdownVisible() ? self.dropdownVisible(0) : self.dropdownVisible(1);
  };


  this.init();
};
var appview = new AppViewModel();
