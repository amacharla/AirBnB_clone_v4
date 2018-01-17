$(document).ready(function () {
  let amenityFilter = [];
  $('div.amenities input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenityFilter.push(' ' + $(this).attr('data-name'));
      } else amenityFilter.pop(' ' + $(this).attr('data-name'));
      $('div.amenities h4').text(amenityFilter);
    });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/')
    .done(function (data) {
      $('div#api_status').addClass('available');
    })
    .fail(function (data) {
      $('div#api_status').removeClass('available');
    });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}'
  }).done(function (data) {
    $('SECTION.places').text('<h1>Places</h1>');
    for(let place in data) {
      let placeArticle = (
        '<article>' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' +
              '<p>' + place.price_by_night + '</p>' +
            '</div>' +
            '<div class="information">' +
              '<div class="max_guest">' +
                '<div class="guest_image"></div>' +
                '<p>' + place.max_guest + '</p>' +
              '</div>' +
              '<div class="number_rooms">' +
                '<div class="bed_image"></div>' +
                '<p>' + place.number_rooms + '</p>' +
              '</div>' +
              '<div class="number_bathrooms">' +
                '<div class="bath_image"></div>' +
                '<p>' + place.number_bathrooms + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="user">' +
            '</div>' +
            '<div class="description">' +
              '<p>' + place.description + '</p>' +
            '</div>' +
          '</article>'
      );
    $('SECTION.places <h1>Places</h1>').append(placeArticle);
  }});
});
