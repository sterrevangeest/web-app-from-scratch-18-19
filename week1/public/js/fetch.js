"use strict";
console.log("lets go");

// var url =
//   "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&ps=100";

// get Data from API
function getData() {
  var url =
    "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";
  fetch(url)
    .then(response => {
      var response = response.json();
      return response;
    })
    .then(data => {
      var filteredData = getFilteredData(data);
      return filteredData;
    })
    .then(filteredData => {
      var elements = createElements(filteredData);
    })
    .catch(error => {
      console.log(error);
    });
}

function getFilteredData(data) {
  var filteredData = data.artObjects;
  return filteredData;
}

function createElements(filteredData) {
  var div = document.querySelector("div");
  div.innerHTML = filteredData
    .map(
      data => `
          <img src="${data.webImage.url}" alt="">
          <p>Titel: ${data.longTitle}</p>`
    )
    .join("");
}
getData();
