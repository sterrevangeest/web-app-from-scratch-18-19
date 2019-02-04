console.log("lets go");

var request = new XMLHttpRequest();
var url =
  "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";
request.addEventListener("load", getData);
request.open("GET", url, true);
request.send();

var body = document.querySelector("body");

function getData() {
  var data = JSON.parse(this.response);
  console.log(data);
  var artObjects = data.artObjects;
  console.log(artObjects);
  artObjects.forEach(function(data) {
    var p = document.createElement("p");
    var img = document.createElement("img");
    var longTitle = document.createTextNode(data.longTitle);
    var imgUrl = document;
    // var image = data.webImage.url;
    var imgUrl = img.src;
    imgUrl = data.webImage.url;
    console.log(imgUrl);

    img.setAttribute("src", imgUrl);

    body.append(p);
    body.append(img);
    p.append(longTitle);
    img.append(imgUrl);
  });
}
