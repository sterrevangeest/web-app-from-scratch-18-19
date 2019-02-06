"use strict";
console.log("lets go");

// Promises
var body = document.querySelector("body");
var url =
  "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";

var request = new XMLHttpRequest();
var loadData = new Promise(function(resolve, reject) {
  request.open("GET", url, true);
  request.onload = function() {
    //console.log(resolve);
    var data = JSON.parse(this.response);
    resolve(data);
  };
  request.send();
});

loadData
  .then(data => {
    var filteredData = getFilteredData(data);
    var elements = createElements(filteredData);
  })
  .catch(err => {
    console.log(err);
  });

function getFilteredData(data) {
  var filteredData = data.artObjects;
  return filteredData;
}

function createElements(filteredData) {
  console.log(typeof filteredData);
  console.log(filteredData);
  var div = document.querySelector("div");
  div.innerHTML = `${filteredData
    .map(
      data => `
        <img src="${data.webImage.url}" alt="">
        <p>Titel:${data.longTitle}</p>`
    )
    .join("")}
`;
}
