(function() {
  //ROUTES
  var router = {
    handle: function() {
      routie({
        "": function() {
          render.loader();
          if (localStorage.length !== 0) {
            console.log("er is localStorage");
            var data = JSON.parse(localStorage.getItem("data"));
            render.overview(data);
          } else {
            // console.log("geen localStorage");
            api.get("overview").then(function(data) {
              render.overview(data);
              return data;
            });
          }
        },
        "/:objectNumber": function(objectNumber) {
          render.loader();
          api.get("detail", objectNumber).then(function(data) {
            render.detail(data);
          });
        }
      });
    }
  };

  //API
  var api = {
    settings: {
      endpoint: "https://www.rijksmuseum.nl/api/nl/collection",
      key: "?key=GJXUiTlF", // format: a-z|0-9
      format: "&" + "format=json", //format: xml / json / jsonp
      results: "&" + "ps=100" //The number of results per page
    },

    get: function(route, objectNumber) {
      var overviewUrl =
        this.settings.endpoint +
        this.settings.key +
        this.settings.format +
        this.settings.results;

      var detailUrl =
        this.settings.endpoint +
        "/" +
        objectNumber +
        this.settings.key +
        this.settings.format +
        this.settings.results;

      if (route === "overview") {
        return api.callOverview(overviewUrl);
      } else if (route === "detail") {
        return api.callDetail(detailUrl);
      }
    },

    callOverview: function(url) {
      return fetch(url)
        .then(function(response) {
          var response = response.json();
          return response;
        })
        .then(function(data) {
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

          api.store(filteredData);
          return filteredData;
        });
    },

    callDetail: function(url) {
      return fetch(url)
        .then(function(response) {
          var response = response.json();
          return response;
        })
        .then(function(data) {
          return data.artObject;
        });
    },

    store: function(data) {
      console.log(data);
      return localStorage.setItem("data", JSON.stringify(data));
    }
  };

  //RENDER
  var render = {
    loader: function() {
      var div = document.querySelector("div");
      div.innerHTML = `<h2>DATA AAN HET OPHALEN...</h2>`;
    },

    overview: function(data) {
      console.log(data);
      var div = document.querySelector("div");
      div.innerHTML = data
        .map(
          data => `
          <div>
              <img src="${data.imgUrl}" alt="">
              <p>${data.title}</p>
              <a href=#/${data.objectNumber}>Meer info</a>
          </div>
              `
        )
        .join("");
    },

    detail: function(data) {
      var div = document.querySelector("div");
      div.innerHTML = ` <h2>${data.title}</h2>
                          <img src="${data.webImage.url}" alt="">
                          <p>${data.subTitle}</p>
                          <p>${data.description}</p>
                          <p>${data.colors}</p>`;
    }
  };
  router.handle();
})();
