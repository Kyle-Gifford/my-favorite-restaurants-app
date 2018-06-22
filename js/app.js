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
  this.markers = model.markers;
  this.handleMarkerClick = function(data, event){
    console.log(event.target.title);
    console.log(event.target);
  };
  this.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);
  this.handleMenuClick = function(self){
    self.dropdownVisible() ? self.dropdownVisible(0) : self.dropdownVisible(1);
  };


  this.init();
};
var appview = new AppViewModel();
