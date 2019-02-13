//ROUTER

var router = {
  route: "/",
  overview: function() {
    console.log("2: Overview route");
    api.get("overview");
  },
  detail: function() {}
};

//API

var api = {
  get: function(route) {
    //fetch  data from api
    var url =
      "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&ps=100";
    fetch(url)
      .then(response => {
        var response = response.json();
        return response;
      })
      .then(data => {
        //filter data
        this.filter(data);
      })
      .catch(error => {
        console.log("OOPS: Something went wrong:");
        console.log(error);
      });
  },

  filter: function(data) {
    var filteredData = data.artObjects;
    render.all(filteredData);
  },
  store: function(response) {
    // save data to object || local storage
    // render.overview();
  },
  parse: function(response) {}
};

//RENDER

var render = {
  overview: function() {},
  detail: function() {},
  all: function(data) {
    var div = document.querySelector("div");
    div.innerHTML = data
      .map(
        data => `
          <img src="${data.webImage.url}" alt="">
          <p>${data.title}</p>`
      )
      .join("");
  }
};

console.log("1: Start router:");
router.overview();
