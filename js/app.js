var Model = {
  "restaurants": fav_strings
};

var AppViewModel = function(){

  this.markers = ko.observableArray();

  this.visible = 0;

  if (window.innerWidth > 330 ){
     this.visible = 1;
  };

  this.dropdownVisible = ko.observable(this.visible);

  this.addMarker = function(data){
    console.log(data)
  };

  this.handleMenuClick = function(self){
    self.dropdownVisible() ? self.dropdownVisible(0) : self.dropdownVisible(1);
  };

};


ko.applyBindings(new AppViewModel());