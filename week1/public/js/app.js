"use strict";
console.log("lets go");

// XMLHttpRequest (XHR)
// var body = document.querySelector("body");
// var request = new XMLHttpRequest();
// var url =
//   "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";
//
// request.open("GET", url, true);
// request.onload = function() {
// var data = JSON.parse(this.response);
// var filteredData = filterData(data);
// var content = renderContent(filteredData);
// };
// request.send();
//
// function getData(data) {
//   var data = JSON.parse(this.response);
//   var filteredData = filterData(data);
//   var content = renderContent(filteredData);
// }
//
// function filterData(data) {
//   var filteredData = data.artObjects;
//   return filteredData;
// }
//
// function renderContent(data) {
//   data.forEach(function(data) {
//     var p = document.createElement("p");
//     var img = document.createElement("img");
//     var longTitle = document.createTextNode(data.longTitle);
//     var imgUrl = data.webImage.url;
//
//     img.setAttribute("src", imgUrl);
//     body.append(img, p);
//     img.append(imgUrl);
//     p.append(longTitle);
//   });
// }

// Promises
var body = document.querySelector("body");
var url =
  "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";

var loadData = new Promise(function(resolve, reject) {
  var request = new XMLHttpRequest();
  console.log(resolve);
  request.open("GET", url, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    resolve(data);
  };
  request.send();
});

loadData.then(data => {
  var filteredData = getFilteredData(data);
  var elements = createElements(filteredData);
});

function getFilteredData(data) {
  var filteredData = data.artObjects;
  return filteredData;
}

function createElements(filteredData) {
  filteredData.forEach(function(data) {
    var p = document.createElement("p");
    var img = document.createElement("img");
    var longTitle = document.createTextNode(data.longTitle);
    var imgUrl = data.webImage.url;

    img.setAttribute("src", imgUrl);
    body.append(img, p);
    img.append(imgUrl);
    p.append(longTitle);
  });
}
