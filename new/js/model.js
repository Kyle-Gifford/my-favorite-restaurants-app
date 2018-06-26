var app = window.app || app || {};
window.app = app;

var AppModel = function(){
  // this.markers = ko.observableArray();
  this.map = null;
  this.markers_obj = {};
  this.markers_arr = [];
  this.places_arr = [];
  this.keys = {};
  this.keys.google_key = app.config.google_key || "PASTE YOUR GOOGLE API KEY HERE";
  this.keys.yelp_token =  app.config.yelp_token || "PASTE YOUR YELP ACCESS TOKEN HERE";
  this.initialize = function(self){
    console.log('AMinitializing');
    // window.gcb = app.functions.gcb;
  }
  this.init_callback = function(self){
    console.log('AMinit complete')
  }

  var init = function(self){
    self.initialize(self);
    self.init_callback(self);
  }
  init(this);

};

app.initialize_model = function(){
  app.model = new AppModel();
};

(app.initialization_sequence || Function)();
