$(document).ready(function () {

  let amenityFilter = {};
  let stateFilter = {};
  let cityFilter = {};

  $('div.amenities input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenityFilter[$(this).attr('data-id')] = ' ' + $(this).attr('data-name');
      } else delete amenityFilter[$(this).attr('data-id')];
      $('div.amenities h4').text(Object.values(amenityFilter));
    });

  $('div.locations input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        $(this).each(function () {
          if ($(this).parent().is('h2')) stateFilter[$(this).attr('data-id')] = ' ' + $(this).attr('data-name');
          if ($(this).parent().is('li')) cityFilter[$(this).attr('data-id')] = ' ' + $(this).attr('data-name');
        });
      } else {
        delete stateFilter[$(this).attr('data-id')];
        delete cityFilter[$(this).attr('data-id')];
      }
      $('div.locations h4').text(Object.values(stateFilter).concat(Object.values(cityFilter)));
    });

  renderPlaces();

  // Render Places based on filters
  $('section.filters button').click(function () {
    let filters = {
      'states': Object.keys(stateFilter),
      'cities': Object.keys(cityFilter),
      'amenities': Object.keys(amenityFilter)
    };
    filters = JSON.stringify(filters);
    $('SECTION.places').children().remove();
    renderPlaces(filters);
  });

  // API STATUS
  $.getJSON('http://0.0.0.0:5001/api/v1/status/')
    .done(function (data) {
      $('div#api_status').addClass('available');
    })
    .fail(function (data) {
      $('div#api_status').removeClass('available');
    });

  // RENDER PLACES
  function renderPlaces (data = '{}') {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: 'json',
      contentType: 'application/json',
      data: data
    }).done(function (data) {
      $('SECTION.places').html('<h1>Places</h1>');
      data.map(place => {
        $('SECTION.places').append(
          '<article>' +
          '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' +
                '<p>$' + place.price_by_night + '</p>' +
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
      });
    });
  }
});
