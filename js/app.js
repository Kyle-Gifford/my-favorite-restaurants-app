var Model = {
  "restaurants": fav_strings
};

var yo = function(){
  console.log('yo');
}

var AppViewModel = function(){

  this.markers = ko.observableArray();

  this.dropdownVisible = ko.observable((window.innerWidth > 330) ? 1 : 0);

  this.addMarker = function(data){
    console.log(data)
  };

  this.handleMenuClick = function(self){
    self.dropdownVisible() ? self.dropdownVisible(0) : self.dropdownVisible(1);
  };

};



ko.applyBindings(new AppViewModel());