// Model

var AppModel = function(){
  this.map = null;
  this.locs = {};
  this.keys = {};
  this.keys.google_key = "AIzaSyBLah8Cju0claUq_s6t_Q4OWyf3h10JeBI";
  this.keys.yelp_token = "6-neofjd1-DISe-n7lFJaVBpv2ImM-zdAxsYO5X_ULqzOxhQsbi2PnBT4d2KGke7di3ZRSuF0YdVJ_QCb9ZgqwnKENzZQDEnd0vv1T2iWUh_j4EIzIpECh2QzEE0W3Yx";
  this.loadGoogle = function(key){
    var tag = document.createElement('script');
    tag.async = true;
    tag.defer = true;
    tag.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key='+ key +'&v=3&callback=vm.googleLoaded';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  this.loadGoogle(this.keys.google_key);
}

var initialize_model = function(){
  window.model = new AppModel();
}

if (typeof initialization_sequence == 'function') {
    initialization_sequence();
}
