console.log("lets go");

var request = new XMLHttpRequest();
var url =
  "https://www.rijksmuseum.nl/api/nl/collection?key=GJXUiTlF&format=json&type=schilderij&ps=100&f.normalized32Colors.hex=%20%23737C84&imgonly=true";
request.addEventListener("load", getData);
request.open("GET", url, true);
request.send();

function getData() {
  var data = JSON.parse(this.response);
  console.log(data);
}
