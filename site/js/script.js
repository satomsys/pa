$(function(){
	var $pallaraxWrap = $('.pWrap'),
		$pallaraxImg =$('.pImg'),
		$section = $('.section'),
		$timer = null,
		$move = $ua == 'desktop' ? 0.125 : 0.05;

	$w.on('scroll resize', function(){

		clearTimeout( $timer );

		var $scrollVal = $(this).scrollTop(),
			$wHeight = $w.height(),
			$scrollBottom = $scrollVal + $wHeight,
			$pallaraxVal = $scrollVal * $move * -1; // うごき

		/**
		* section add class
		*/

		$timer = setTimeout(function(){
			$.each( $section, function(i,e){
				var $this = $(this),
					$sectionOffset = $this.offset().top;

				if( $sectionOffset <= $scrollBottom - 20 ){
					$this.addClass('inview');
				}

			})
		}, 200 );

		/**
		* pallarax
		*/
		// $timer = setTimeout(function(){

			$.each( $pallaraxWrap, function(){
				var $this = $(this),
					$thisOffset = $this.offset().top;

				$this.css('overFlow','hidden');

				if( $thisOffset <= $scrollBottom - 20 && $scrollVal < $thisOffset + $this.outerHeight() ){
					console.log( $this.attr('class' ))
					$this.find('.pImg').css({
						'transform' : 'translateY(' + $pallaraxVal + 'px)'
					});

				} else if( $thisOffset + $this.outerHeight() < $scrollVal ){
					console.log( 'aaa' )
				}
			}	);		
		// }, 300 )
	});

 });



/**
* slick.js
*/

$('.mainvisual_image').slick({
  autoplay: true,
  autoplaySpeed: 6000,
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'	
});




// /**
// * スワイプの方向を取得（SP
// * @see Position
// * @return $dir {string} left /right スワイプの方向
// */
// function touchDirection( activeModal, e ){
// 		var $pos = Position( e ), //x and y	
// 			// $contentWidth = $activeModal.outerWidth();
// 			$contentHalfWidth = activeModal.outerWidth() / 2;

// 			$dir = $contentHalfWidth < $pos.x ? 'right' : 'left';

// 			return $dir;
// 	// })		
// }

// /*
// * タップ・スワイプの現在位置を得る
// */
// function Position( e ){
// 	var x = e.originalEvent.touches[0].pageX;
// 	var y = e.originalEvent.touches[0].pageY;
// 	x = Math.floor(x);
// 	y = Math.floor(y);
// 	var pos = {'x':x , 'y':y};
// 	return pos;
// }

