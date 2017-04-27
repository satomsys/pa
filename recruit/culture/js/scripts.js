
var $slideNum = 9,
	$initialSlide = Math.round( Math.random() * ( $slideNum - 1 ) );

console.log( $initialSlide );
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
	asNavFor: '.sliderNav',
	initialSlide: $initialSlide,
	// autoplay:trueのとき、マウスフォーカスしたら一時停止させるか [初期値:true]
	pauseOnFocus: false,
	// autoplay:trueのとき、マウスホバーしたら一時停止させるか [初期値:true]
	pauseOnHover: false,
	// autoplay:trueのとき、ドットナビゲーションをマウスホバーしたら一時停止させるか [初期値:false]
	pauseOnDotsHover: false
});

 $('.sliderNav').slick({
	slidesToShow: $slideNum,
	slidesToScroll: 1, 
	asNavFor: '.cultureVisual_slider',
	dots: false,
	focusOnSelect: true,
	initialSlide: $initialSlide
 });