$(document).ready(function () {
  let amenityFilter = {};
  $('div.amenities input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenityFilter[$(this).attr('data-id')] = ' ' + $(this).attr('data-name');
      } else  delete amenityFilter[$(this).attr('data-id')];
      $('div.amenities h4').text(Object.values(amenityFilter));
    });
});
