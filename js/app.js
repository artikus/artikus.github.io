"use strict";

/* global $, google, AOS */
function initializeMap() {
  var myLatLng = new google.maps.LatLng(50.4664452, 30.50814);
  var mapOptions = {
    zoom: 18,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    draggable: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var info = new google.maps.InfoWindow({
    content: '<h5>Artikus</h5><p>вул. Льва Товстого, 3</p>'
  });
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Office'
  });
  google.maps.event.addListener(marker, 'click', function () {
    return info.open(map, marker);
  });
  var styles = [{
    stylers: [{
      hue: '#0200e6'
    }, {
      saturation: -20
    }]
  }, {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
      lightness: 100
    }, {
      visibility: 'simplified'
    }]
  }, {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];
  map.setOptions({
    styles: styles
  });
}

google.maps.event.addDomListener(window, 'load', initializeMap);
$(document).ready(function () {
  var e = $('.section-navigation');
  var t = e.offset().top;
  var currentDate = new Date();
  $('#year').text(currentDate.getFullYear());
  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop();
    $('.parallax-up').css('background-position', "left ".concat(-(scrolled * 0.2), "px"));
    $('.parallax-down').css('background-position', "left ".concat(-(scrolled * 0.1), "px"));

    if (scrolled >= t) {
      e.addClass('section-navigation_fixed-top');
    } else {
      e.removeClass('section-navigation_fixed-top');
    }
  });
  $('.scroll-to').click(function (event) {
    // WTF?
    $(this).attr('href');

    if (this.hash !== '') {
      event.preventDefault();
      var h = this.hash;
      $('html:not(:animated),body:not(:animated)').animate({
        scrollTop: $(h).offset().top - 60
      }, 1200);
      window.history.pushState(null, null, this.hash);
    }

    var parent = $(this).parent();
    parent.siblings().removeClass('active');
    parent.addClass('active');
    return false;
  });
  var upBtn = $('#up-btn');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      upBtn.fadeIn();
    } else {
      upBtn.fadeOut();
    }
  });
  upBtn.on('click', function () {
    $('html:not(:animated),body:not(:animated)').animate({
      scrollTop: 0
    }, 600);
  });
});
$(window).on('load', function () {
  return AOS.init({
    offset: 0
  });
});