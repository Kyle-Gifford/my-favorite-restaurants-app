//google_api_key
//fav_strings
maps_script = '<script async defer src="https://maps.googleapis.com/maps/api/js?key=' + google_api_key + '&v=3&callback=initMap"></script>'

$("body").append(maps_script)

var Model = function(){
  this.locations = ko.observableArray();
}

var ViewModel = function(){

  this.active_toggle = function(){
    if (this.active == true) {
      this.active = false
    } else {
      this.active = true
    }
  }

}


ko.applyBindings(new ViewModel());