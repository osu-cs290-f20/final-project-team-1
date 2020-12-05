// Creates <script> tag to access API
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD_OCPs2EO5gnBABRpMDdbEZzdH7OeESC4&callback=initMap';
script.defer = true;

// The API will callback when finished loading
window.initMap = function() {
  // Creates a new Map object inserting it into <div id="map"></div>
  map = new google.maps.Map(document.getElementById('map'), {
    // Each Map object must have a center defined with a latitude & longitude pair, and a zoom level
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
};

// Appends the API <script> tag to <head>
document.head.appendChild(script);

window.addEventListener('DOMContentLoaded', function() {
  // UI interactions will go here
});
