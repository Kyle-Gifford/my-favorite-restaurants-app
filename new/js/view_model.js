var app = window.app || app || {};
window.app = app;

var AppViewModel = function(){
  this.googleLoaded = function(){
    app.f.initMap(app.i.styles);
    // todo get markers (then try with initmap commented out if not working then need to see if can access initmap callback);
    app.f.getMarkers();
  };
  this.mapLoaded = function() {

  }
  this.initialize = function(self){
    console.log('AVMinitializing')
    app.f.loadGoogle(app.model.keys.google_key);
  };
  this.init_callback = function(self){
    console.log('AVMinit complete')
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




