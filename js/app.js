var Marker = function() {
  this.restaurant_strings = fav_strings;
}

var AppViewModel = function(){
  this.markers = ko.observableArray();

  this.addMarker = function(data){
    console.log(data)
  };

}


ko.applyBindings(new AppViewModel());

// load map script from secret api key
var tag = document.createElement('script');
tag.async = true;
tag.defer = true;
tag.src = 'https://maps.googleapis.com/maps/api/js?key='+ google_api_key +'&v=3&callback=initMap';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);