var myLatlng;
var map;
var marker;

function initializeMap() {
  myLatlng = new google.maps.LatLng(50.439564, 30.5147567);

  var mapOptions = {
    zoom: 18,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    draggable: false
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow = new google.maps.InfoWindow({
    content: '<h5>Artikus</h5><p>вул. Льва Товстого, 3</p>'
  });

  marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Office'
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

  var styles = [
    {
      stylers: [
        { hue: '#0200e6' },
        { saturation: -20 }
      ]
    }, {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { lightness: 100 },
        { visibility: 'simplified' }
      ]
    }, {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  map.setOptions({ styles: styles });
}

google.maps.event.addDomListener(window, 'load', initializeMap);
