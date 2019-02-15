//ROUTER
var router = {
  detail: function() {
    routie(":objectNumber", function(objectNumber) {
      api.get("detail", objectNumber);
    });
  },
  overview: function() {
    routie("/alles", function() {
      api.get("overview");
    });
  },
  overview: function() {
    api.get("overview");
  }
};

//API
var api = {
  get: function(route, objectNumber) {
    if (route === "overview") {
      var url =
        "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&ps=100";
    } else if (route === "detail") {
      var url =
        "https://www.rijksmuseum.nl/api/nl/collection/" +
        objectNumber +
        "?key=GJXUiTlF&format=json";
    }

    fetch(url)
      .then(response => {
        var response = response.json();
        return response;
      })
      .then(data => {
        if (route === "overview") {
          this.filter(data);
        } else {
          console.log("detail");
          render.detail(data);
        }
      })
      .catch(error => {
        console.log("OOPS: Something went wrong:");
        console.log(error);
      });
  },

  filter: function(data) {
    console.log(data);
    var filteredData = [];
    var data = data.artObjects;
    data.forEach(function(data) {
      filteredData.push({
        title: data.title,
        objectNumber: data.objectNumber,
        imgUrl: data.webImage.url,
        detailUrl: data.links.self + "?key=GJXUiTlF&format=json"
      });
    });

    render.overview(filteredData);
    router.detail(data.objectNumber);
  },
  store: function(response) {
    // save data to object || local storage
    // render.overview();
  },
  parse: function(response) {}
};

//RENDER
var render = {
  overview: function(data) {
    var div = document.querySelector("div");
    div.innerHTML = data
      .map(
        data => `
            <img src="${data.imgUrl}" alt="">
            <p>${data.title}</p>
            <a href=#${data.objectNumber}>Bekijk meer<a>
            `
      )
      .join("");
  },

  detail: function(data) {
    var data = data.artObject;
    console.log(data.description);
    var div = document.querySelector("div");
    div.innerHTML = ` <h2>${data.title}</h2>
                      <img src="${data.webImage.url}" alt="">
                      <p>${data.description}</p>
                      <p>${data.colors}</p>`;
  }
};

router.overview();
