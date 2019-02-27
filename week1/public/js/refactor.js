//ROUTER
var router = {
  overview: function() {
    routie("", function() {
      api.get("overview").then(function(data) {
        render.overview(data);
      });
    });
  },
  detail: function() {
    routie(":objectNumber", function(objectNumber) {
      console.log(objectNumber);
      api.get("detail", objectNumber).then(function(data) {
        render.detail(data);
      });
    });
  }
};

//API
var api = {
  endpoint: {
    standard: "https://www.rijksmuseum.nl/api",
    language: "/nl", // format: nl/en
    endpoint: "/collection", //format: Collection, Content pages, Usersets, Calendar
    objectNumber: "",
    key: "?key=" + "GJXUiTlF", // format: a-z|0-9
    format: "&" + "format=json", //format: xml / json / jsonp
    results: "&" + "ps=100" //The number of results per page
    // var color = "&" + "f.normalized32Colors.hex="; //Colors found in the images (mind: The `#` in #FF0000 should be url-encoded!)
  },

  get: function(route, objectNumber) {
    console.log(route);
    console.log(objectNumber);

    if (route === "overview") {
      var url =
        "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&ps=100";
      return api.getOverview(url);
    } else if (route === "detail") {
      var url =
        "https://www.rijksmuseum.nl/api/nl/collection/" +
        objectNumber +
        "?key=GJXUiTlF&format=json";
      return api.getDetail(url);
    }
  },

  getOverview: function(url) {
    return fetch(url)
      .then(response => {
        var response = response.json();
        return response;
      })
      .then(data => {
        console.log(data);
        var filteredData = []; //clean
        var data = data.artObjects;
        data.forEach(function(data) {
          filteredData.push({
            title: data.title,
            objectNumber: data.objectNumber,
            imgUrl: data.webImage.url,
            detailUrl: data.links.self + "?key=GJXUiTlF&format=json"
          });
        });
        return filteredData;
      });
  },
  getDetail: function(url) {
    console.log(url);
    return fetch(url)
      .then(response => {
        var response = response.json();
        return response;
      })
      .then(data => {
        console.log(data);
        return data.artObject;
      });
  },

  store: function(response) {
    // save data to object || local storage
    // render.overview();
  }
};

//RENDER
var render = {
  overview: function(data) {
    console.log(data);
    var div = document.querySelector("div");
    div.innerHTML = data
      .map(
        data => `
            <img src="${data.imgUrl}" alt="">
            <p>${data.title}</p>
            <a href=#/${data.objectNumber}>Bekijk meer<a>
            `
      )
      .join("");
  },

  detail: function(data) {
    //var data = data.artObject;
    console.log("DETAIL");

    var div = document.querySelector("div");
    div.innerHTML = ` <h2>${data.title}</h2>
                        <img src="${data.webImage.url}" alt="">
                        <p>${data.description}</p>
                        <p>${data.colors}</p>`;
  }
};

// router.overview();

routie({
  "": function() {
    api.get("overview").then(function(data) {
      render.overview(data);
    });
  },
  "/:objectNumber": function(objectNumber) {
    api.get("detail", objectNumber).then(function(data) {
      render.detail(data);
    });
  }
});

console.log(routie);
