var AppModel = function(){
  // this.markers = ko.observableArray();
  this.map = null;
  this.markers_obj = {};
  this.places_arr = [];
  this.keys = {};
  this.keys.google_key = config.google_key || "PASTE YOUR GOOGLE API KEY HERE";
  this.keys.yelp_token =  config.yelp_token || "PASTE YOUR YELP ACCESS TOKEN HERE";
  this.initialize = function(self){
        // window.gcb = app.functions.gcb;
  }
  this.init_callback = function(self){
      }

  var init = function(self){
    self.initialize(self);
    self.init_callback(self);
  }
  init(this);

};

var initialize_model = function(){
  window.model = new AppModel();
};

(window.initialization_sequence || Function)();
