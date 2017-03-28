$(function(){
	var $section = $('.section'),
		$timer = null,
		$move = $ua == 'desktop' ? 0.125 : 0.05,
		$wwaArticles = $('.wwaArticles'),
		$wwaArticle = $wwaArticles.find('.wwaArticles_article');



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
	});


	/**
	* what we are
	*/
	$wwaArticle.on( 'click', function( e ){
		e.stopPropagation();

		var $this = $(this),
			$overlay = $('.overlay'),
			$article = $this.find('.wwaArticles_article_content');

		$this.addClass('active');
		$article.fadeIn('slow');

		console.log( $article );

		$('body').addClass('showOverlay');

		$overlay.on('click', function(){
			$('body').removeClass('showOverlay');
			
			setTimeout( function(){
				$this.removeClass('active');
				$article.fadeOut('fast');
			}, 200 )
		})

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
}).on('afterChange', function(){
	var activeImg = $(this).find('.slick-active'),
		textColor = activeImg.data('overtext');

	$('.mainvisual').removeClass('black').addClass( textColor );
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

