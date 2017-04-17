
/**
* fancybox
*/
$("[data-fancybox]").fancybox();
$(".button-cultureStyle").on('click', function(){
	$.fancybox.close();
});


/**
* slick
*/

$('.cultureVisual_slider').slick({
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  swipe: true,
  cssEase: 'linear'	
}).on('afterChange', function(){
	var $activeImg = $(this).find('.slick-active img')
		$previewStyle = $activeImg.data('preview')
		$button = $('.cultureVisual_button a');

		$button.attr( 'data-src', $previewStyle );
});