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
});
