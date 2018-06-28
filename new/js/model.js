var AppModel = function(){
  this.map = null;
  this.locs = {};
  this.keys = {};
  this.keys.google_key = config.google_key || "PASTE YOUR GOOGLE API KEY HERE";
  this.keys.yelp_token =  config.yelp_token || "PASTE YOUR YELP ACCESS TOKEN HERE";
  this.loadGoogle = function(key){
    var tag = document.createElement('script');
    tag.async = true;
    tag.defer = true;
    tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ key +'&v=3&callback=vm.googleLoaded';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };
  this.loadGoogle(this.keys.google_key);
};

var initialize_model = function(){
  window.model = new AppModel();
};

(window.initialization_sequence || Function)();
