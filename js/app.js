

var Model = function(){
  this.locs = [];
  this.api_key = google_api_key;
  this.fav_strings = fav_strings;
  this.styles = styles;
  this.getLocs = getLocs;
  this.loadGoogle = loadGoogle;
  this.googleLoadedCallback = googleLoadedCallback;
  this.initMap = initMap;
  this.addZomatoRatingtoLocs = addZomatoRatingtoLocs;

  this.init = function(){
    self.loadGoogle();
  };


  this.init();
};
model = new Model();


var AppViewModel = function(){
  this.init = function(){
    console.log('AppViewModel initializing');
    console.log(self.model.locs);
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
