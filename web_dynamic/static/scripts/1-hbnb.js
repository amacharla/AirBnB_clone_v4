$(document).ready(function () {
  let amenityFilter = [];
  $('div.amenities input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenityFilter.push($(this).attr('data-name'));
      } else amenityFilter.pop($(this).attr('data-name'));
    });
});
