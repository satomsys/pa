
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
	slidesToShow: 1,
	slidesToScroll: 1,	
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  swipe: true,
  cssEase: 'linear',
  asNavFor: '.sliderNav'
}).on('afterChange', function(){
	var $activeImg = $(this).find('.slick-active img')
		$previewStyle = $activeImg.data('preview')
		$button = $('.cultureVisual_button a');

		$button.attr( 'data-src', $previewStyle );
});


 $('.sliderNav').slick({
	slidesToShow: 18,
	slidesToScroll: 1, 
	asNavFor: '.cultureVisual_slider',
	dots: true,
	centerMode: false,
	focusOnSelect: true
 });