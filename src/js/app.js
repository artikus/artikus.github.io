/* global $, google, AOS */

function initializeMap() {
  const myLatLng = new google.maps.LatLng(50.466109, 30.5051482);
  const mapOptions = {
    zoom: 18,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    draggable: true,
  };

  const map = new google.maps.Map(
    document.getElementById('map-canvas'),
    mapOptions,
  );

  const info = new google.maps.InfoWindow({
    content: '<h5>Artikus</h5><p>вул. Льва Товстого, 3</p>',
  });

  const marker = new google.maps.Marker({
    map,
    position: myLatLng,
    title: 'Office',
  });

  google.maps.event.addListener(marker, 'click', () => info.open(map, marker));

  const styles = [
    {
      stylers: [{ hue: '#0200e6' }, { saturation: -20 }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ lightness: 100 }, { visibility: 'simplified' }],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];

  map.setOptions({ styles });
}

google.maps.event.addDomListener(window, 'load', initializeMap);

$(document).ready(function() {
  const e = $('.section-navigation');
  const t = e.offset().top;

  $(window).on('scroll', () => {
    const scrolled = $(window).scrollTop();

    $('.parallax-up').css('background-position', `left ${-(scrolled * 0.2)}px`);
    $('.parallax-down').css(
      'background-position',
      `left ${-(scrolled * 0.1)}px`,
    );

    if (scrolled >= t) {
      e.addClass('section-navigation_fixed-top');
    } else {
      e.removeClass('section-navigation_fixed-top');
    }
  });

  $('.scroll-to').click(function(event) {
    // WTF?
    $(this).attr('href');
    if (this.hash !== '') {
      event.preventDefault();
      const h = this.hash;

      $('html:not(:animated),body:not(:animated)').animate(
        { scrollTop: $(h).offset().top - 60 },
        1200,
      );

      window.history.pushState(null, null, this.hash);
    }

    const parent = $(this).parent();
    parent.siblings().removeClass('active');
    parent.addClass('active');

    return false;
  });

  const upBtn = $('#up-btn');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 200) {
      upBtn.fadeIn();
    } else {
      upBtn.fadeOut();
    }
  });

  upBtn.on('click', () => {
    $('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0 }, 600);
  });
});

$(window).on('load', () => AOS.init({ offset: 0 }));
