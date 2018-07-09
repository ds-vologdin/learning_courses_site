// Отображение dropdown меню (jquery)
$('.dropdown-js-control').hover(
  function() {
    $(this).find('.dropdown-js').stop(true, true).delay(200).fadeIn();
  },
  function() {
    $(this).find('.dropdown-js').stop(true, true).delay(200).fadeOut();
  })
