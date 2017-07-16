var allCats = [
    {
      name : "Anna",
      whatKind : "cute",
      numClick : 0,
      imgLink  : "images/cat1.jpg"
    },
    {
      name : "Ben",
      whatKind : "pretty",
      numClick : 0,
      imgLink  : "images/cat2.jpg"
    },
    {
      name : "Cathy",
      whatKind : "playful",
      numClick : 0,
      imgLink  : "images/cat3.jpg"
    },
    {
      name : "Danna",
      whatKind : "cool",
      numClick : 0,
      imgLink  : "images/cat4.jpg"
    },
    {
      name : "Eric",
      whatKind : "naughty",
      numClick : 0,
      imgLink  : "images/cat5.jpg"
    }
];

var Cat = function(data){
  this.name = ko.observable(data.name);
  this.numClick = ko.observable(data.numClick);
  this.imgLink = ko.observable(data.imgLink);
  this.whatKind = ko.observable(data.whatKind);
    
  this.catLevel = ko.computed(function(){
    var title = "";
    var clickCount = this.numClick();
    if (clickCount < 10) {
      title = "newborn";
    } else if (clickCount < 50) {
      title = "infant";
    } else if (clickCount < 100) {
      title = "child";
    } else if (clickCount < 200) {
      title = "Teen";
    } else if (clickCount < 500) {
      title = "adult";
    } else {
      title = "ninja";
    }

    return title;
  }, this);
}

var ViewModel = function() {
  var self = this;

  this.catList = ko.observableArray([]);

  allCats.forEach(function(catItem) {
    self.catList.push(new Cat(catItem) );
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function() {
    // this ===> currentCat
    this.numClick(this.numClick() + 1);

    // or this way
    // self.currentCat.numClick(self.currentCat.numClick() + 1);
  };

  this.catChanger = function(clickedCat) {
    self.currentCat(clickedCat);
  }
}

ko.applyBindings(new ViewModel());
