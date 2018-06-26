var app = window.app || app || {};
if (!window.app) { window.app = app };

var AppViewModel = function(){

  this.getMarkers = function(){
    app.f.addMarkersToObj();
  }

  this.geocodesLoaded = false;

  this.handleMarkerClick = function(){
    var coords = this.coords;

  }

  this.googleLoaded = function(){
    app.f.initMap(app.i.styles);
    app.f.getGeocodes();
  };

  this.mapLoaded = function() {

  }

  this.getYelp = function(obj){
    console.log('avmyelp');
    console.log(obj);
    app.f.addYelpRating(obj);
  }

  this.initialize = function(self){
        app.f.loadGoogle(app.model.keys.google_key);
  };
  this.init_callback = function(self){
      };
  var init = function(self){
    self.initialize(self);
    self.init_callback(self);
  };
  init(this);
};

app.initialize_view_model = function(){
  app.viewmodel = new AppViewModel();
};


//for last js file to load:
app.initialization_sequence = function(){
  if (!app.initialize_model) {
    return false;
  } else if (!app.model) {
    app.initialize_model();
  }
  app.initialize_view_model();
};


(app.initialization_sequence || Function)();
