(function () {
  // Model
  var arrayCat = [{
      name: "Anna",
      whatKind: "cute",
      numClick: 0,
      imgLink: "images/cat1.jpg"
    },
    {
      name: "Ben",
      whatKind: "pretty",
      numClick: 0,
      imgLink: "images/cat2.jpg"
    },
    {
      name: "Cathy",
      whatKind: "playful",
      numClick: 0,
      imgLink: "images/cat3.jpg"
    },
    {
      name: "Danna",
      whatKind: "cool",
      numClick: 0,
      imgLink: "images/cat4.jpg"
    },
    {
      name: "Eric",
      whatKind: "naughty",
      numClick: 0,
      imgLink: "images/cat5.jpg"
    }
  ];

  // View
  var view = {
    init: function () {
      // fill in the list
      for (var i = 0, len = arrayCat.length; i < len; i++) {
        // show the list of options
        $("#list-of-cat").append(`<li class="defult"> Choose ${arrayCat[i].whatKind} ${arrayCat[i].name}!</li>`);
        // each item has two classes: 'item' and 'cat-x'
        $(".defult").attr('class', 'item cat-' + i);
      }

      // initiate the viewer
      $("#cat-image-container").append(
        `<div class="cat-image-box"> 
          <p id="name-of-cat"></p>
          <img id="image-of-cat" src="">
          <p id="click-counter">If you click one of them, a cute cat will show up! Try it!</p> 
        </div>`
      );

      // creat the admin button
      $("#admin-use-only").prepend('<div id="admin-button">Admin</div>');

      // create the admin area
      $("#admin-options").append(
        `<form id="admin-ared"><br>
          Name <input type="text" id="admin-name">
          ImgURL <input type="text" id="admin-url">
          #click <input type="text" id="admin-clicks">
          How will you describe him/her? <input type="text" id="admin-adj">
          <div class="button-col-12 save-button">Save</div>
          <div class="button-col-12 cancel-button">Cancel</div>
        </form>`
      );
    },

    refreshList: function () {
      for (var i = 0, len = arrayCat.length; i < len; i++) {
        // show the list of cats
        itemId = ".cat-" + i;
        $(itemId).text(`Choose ${arrayCat[i].whatKind} ${arrayCat[i].name}!`);
      }
    },

    changeThePic: function (catNum) {
      $("#name-of-cat").text(arrayCat[catNum].name);
      $("#image-of-cat").attr('src', arrayCat[catNum].imgLink);

      if (arrayCat[catNum].numClick === 0) {
        $("#click-counter").text('Try click the cat! You love cat, don\'t you?');
      }

      if (arrayCat[catNum].numClick > 0) {
        $("#click-counter").text(`You clicked ${arrayCat[catNum].numClick} times`);
      }

      $("#admin-button").css('display', 'block');
    },

    updateClicker: function (catNum) {
      $("#click-counter").text(`You clicked ${arrayCat[catNum].numClick} times`);
    },

    closeAdminArea: function () {
      // close admin options
      $("#admin-options").css("display", "none");

      // empty all inputs
      $('#admin-name').val("");
      $('#admin-url').val("");
      $('#admin-clicks').val("");
    }
  };

  // Octopus
  var octopus = {
    currentCat: 0,

    init: function () {
      view.init();
    },

    userClickList: function (catNum) {
      // change current cat
      currentCat = catNum;
      // update pic & info
      view.changeThePic(catNum);
    },

    userClickImage: function () {
      // increment the counter
      arrayCat[currentCat].numClick++;
      // update view
      view.updateClicker(currentCat);
    },

    userClickAdmin: function () {
      if ($("#admin-options").css("display") === "none") {
        // show the admin area
        $("#admin-options").css("display", "block");
      } else {
        // click once more, hide the admin area
        $("#admin-options").css("display", "none");
      }
    },

    userClickSave: function () {
      // get the inputs
      var newName = $('#admin-name').val();
      var newImgURL = $('#admin-url').val();
      var newNumClicks = $('#admin-clicks').val();
      var newWhatKind = $('#admin-adj').val();

      // update the info if input is valid
      if (newName !== "") {
        arrayCat[currentCat].name = newName;
      }

      if (newImgURL !== "") {
        arrayCat[currentCat].imgLink = newImgURL;
      }

      if (newNumClicks !== "") {
        arrayCat[currentCat].numClick = newNumClicks;
      }

      if (newWhatKind !== "") {
        arrayCat[currentCat].whatKind = newWhatKind;
      }

      // update the view
      view.refreshList();
      view.changeThePic(currentCat);

      // close admin area
      view.closeAdminArea();
    },

    userClickCancel: function () {
      // close admin area
      view.closeAdminArea();
    }
  };

  // initiate the page
  octopus.init();

  // event: user clicks the image
  $("#image-of-cat").click(function () {
    octopus.userClickImage();
  });

  // event: user clicks admin button
  $("#admin-button").click(function () {
    octopus.userClickAdmin();
  });

  // event: user clicks save button
  $(".save-button").click(function () {
    octopus.userClickSave();
  });

  // event: user clicks cancel button
  $(".cancel-button").click(function () {
    octopus.userClickCancel();
  });

  // event: user clicks an item
  $(".item").click(function () {
    // class="item cat-x"
    var itemClass = $(this).attr('class');
    // last char tells which cat
    var catIndex = itemClass.length - 1;

    octopus.userClickList(itemClass[catIndex]);
  });

})();
