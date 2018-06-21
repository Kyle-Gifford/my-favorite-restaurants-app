var Model = function(){
  this.init = function(){
    var geocoder;
    var map;
    window.map = map;
    window.geocoder = geocoder;
    self.loadGoogle();
  };
  this.locs = [];
  this.addYelpRating = addYelpRating;
  this.api_key = google_api_key;
  this.yelp_api_key = yelp_api_key;
  this.fav_strings = fav_strings;
  this.styles = styles;
  this.getLocs = getLocs;
  this.loadGoogle = loadGoogle;
  this.googleLoadedCallback = googleLoadedCallback;
  this.initMap = initMap;
  this.addYelpRatingstoLocs = addYelpRatingstoLocs;

  this.init();
};
model = new Model();


var AppViewModel = function(){
  this.init = function(){
    console.log('AppViewModel initializing');
  }
  this.model = model;
  this.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);
  this.addMarker = function(data){
    console.log(data)
  };
  this.handleMenuClick = function(self){
    self.dropdownVisible() ? self.dropdownVisible(0) : self.dropdownVisible(1);
  };

  this.init();
};


ko.applyBindings(new AppViewModel());
