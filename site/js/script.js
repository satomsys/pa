$(function(){
	var $section = $('.section'),
		$timer = null,
		$move = $ua == 'desktop' ? 0.125 : 0.085,
		$wwaArticles = $('.wwaArticles'),
		$wwaArticle = $wwaArticles.find('.wwaArticles_article');



	$w.on('scroll resize load', function(){
		clearTimeout( $timer );


		console.log( $ua )
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
					$sectionOffset = $this.offset().top
					$scrollDelay = $ua == 'desktop' ? 20 : 30;

				if( $sectionOffset <= $scrollBottom - $scrollDelay ){
					$this.addClass('inview');
				}

			})
		}, 100 );
	});



	/**
	* what we are
	*/
	$wwaArticle.on( 'click', function( e ){
		e.stopPropagation();

		var $WwaModal = new WwaModal( $(this) ),
			$overlay = $('.overlay');

		$WwaModal.switchClass();

		$overlay.on('click', function(){
			e.stopPropagation();
			$WwaModal.closeModal(200);
		} );	
	});


 });



/**
* fancybox
*/
$("[data-fancybox]").fancybox({
	iframe : {
		// css : {
		// 	maxWidth : '1280px',
		// 	maxHeight: '720px',
		// 	minHeight: '200px'
		// }
		css : {
			width : '1280px',
			maxWidth: '80%',
			minHeight: '30%'
		}		
	}
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
  swipe: true,
  cssEase: 'linear'	
}).on('afterChange', function(){
	var activeImg = $(this).find('.slick-active'),
		textColor = activeImg.data('overtext');

	$('.mainvisual').removeClass('black').addClass( textColor );
});



/**
* what we are　モーダル
*/
var WwaModal = function( e ){
	this.wrap = e,
	this.body = $('body'),
	this.wwaArticles = $('.wwaArticles'),
	this.img = this.wrap.find('.wwaArticles_article_img');
	this.article = this.wrap.find('.wwaArticles_article_content');
} 

/**
* モーダル開閉、svg付与
* @extends WwaModal
*/
WwaModal.prototype.switchClass = function(){
	//open
	if( !this.body.hasClass('viewWhatWeAre') ){
		this.body.addClass('viewWhatWeAre');
		this.wrap.addClass('active');

		this.setPosition();

		$('svg#poly').remove();
		this.article.append('<svg version="1.1" id="poly" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 631 225" style="enable-background:new 0 0 631 225;" xml:space="preserve"><style type="text/css">.st0{fill:url(#SVGID_1_);}</style><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="631" y1="113.5" x2="1.818989e-12" y2="113.5" gradientTransform="matrix(1 0 0 -1 0 226)"><stop  offset="0" style="stop-color:#FFC61F"/><stop  offset="1" style="stop-color:#FF6D1F"/></linearGradient><polygon class="st0" points="79,0 0,79 0,225 552,225 631,146 631,0 "/></svg><i class="closeWwaModalButton"></i>');
	} else {
		this.body.removeClass('viewWhatWeAre');
		this.wrap.removeClass('active');

	}
}

/**
* モーダル閉じる
* @extends WwaModal
*/
WwaModal.prototype.closeModal = function( delay ){
	this.body.removeClass('viewWhatWeAre');

	var wrap = this.wrap;

	setTimeout( function(){
		wrap.removeClass('active');
	}, delay );	
}

/**
* コメント部分のポジショニング
* @extends WwaModal
*/
WwaModal.prototype.setPosition = function( ){

	if( $ua == 'mobile' ) return;

	var $wrapOffset_left = this.wwaArticles.offset().left,
		$wrapOffset_top = this.wwaArticles.offset().top,
		$imgOffset_left = this.img.offset().left,
		$imgOffset_top = this.img.offset().top,	
		$imgWidth = this.img.width(),
		$imgScalable = $imgWidth * 1.5 - $imgWidth;

	// console.log( '$wrapOffset_left', $wrapOffset_left,'$wrapOffset_top', $wrapOffset_top,'$imgOffset_left', $imgOffset_left,'$imgOffset_top', $imgOffset_top,'$imgWidth', $imgWidth );
		
	$articleOffset = {
		left: 	Math.ceil($imgOffset_left -$wrapOffset_left + $imgWidth + $imgScalable ),
		right: 	Math.ceil(this.wwaArticles.width() - ($imgOffset_left - $wrapOffset_left) + $imgScalable ),
		top:  	Math.ceil($imgOffset_top - $wrapOffset_top )
	};

	if( this.wrap.hasClass('notesRight') ){
		this.article.css({
			top: $articleOffset.top,
			left: $articleOffset.left
		});
	} else {
		this.article.css({
			top: $articleOffset.top,
			right: $articleOffset.right
		});			
	}
}


/**
* リセット用
* @extend Wwamodal
*/
WwaModal.prototype.reset = function( ){
	$('svg#poly').remove();
	this.body.removeClass('viewWhatWeAre');
	this.wrap.removeClass('active');	
}