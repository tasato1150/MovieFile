$(document).on('turbolinks:load', function() {
  $('.Picture__sub').click(function () {
    var $src = $(this).attr('src');
    $('.Picture').attr('src', $src);
  });
});