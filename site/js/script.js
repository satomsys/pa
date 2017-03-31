$(function(){
	var $section = $('.section'),
		$timer = null,
		$move = $ua == 'desktop' ? 0.125 : 0.085,
		$WwaModal = null,
		$wwaArticles = $('.wwaArticles'),
		$wwaArticle = $wwaArticles.find('.wwaArticles_article');



	$w.on('scroll resize load', function(){
		clearTimeout( $timer );

		var $scrollVal = $(this).scrollTop(),
			$wHeight = $w.height(),
			$scrollBottom = $scrollVal + $wHeight,
			$pallaraxVal = $scrollVal * $move * -1; // うごき

		if( $ua == 'desktop' && $WwaModal ) $WwaModal.reset();

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
			});
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

var $textList = [
 '存在を超え、<br class="tabShow">暮らしを支え、<br class="tabShow"><span class="offindent">街をつくる</span>',
 '未来は、加速する'
],
	textPatternSave = null
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
	var activeImg = $(this).find('.slick-active')
		textPattern = activeImg.data('textpattern'),
		textColor = activeImg.data('overtext');


		if( textPattern !== textPatternSave ){
			$('.mvArticle_text').find('span').fadeOut( 'fast', function(){
				var $this = $( this );
				$this.parent().append( '<span>' + $textList[textPattern] + '</span>').hide().fadeIn('fast', function(){
					$this.remove();
				});
			});
		}

	// $('.mvArticle_text').find('span').html( $textList[textPattern] );
	$('.mainvisual').removeClass('black').addClass( textColor );
	
	textPatternSave = textPattern;
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

		if( $ua == 'mobile' ){
			$('.closeWwaModalButton').remove();
			this.article.append('<i class="closeWwaModalButton"></i>');
			return;
		} else {
			// var $wInnerHeight = $w.innerHeight();
			// 	$wwaArticlesOffsetTop = this.wwaArticles.offset().top;

			// if( $wwaArticlesOffsetTop + this.wwaArticles.outerHeight()/2 < $w.scrollTop ){
			// 	$('body,html').animate({
			// 		scrollTop: $wwaArticlesOffsetTop + this.wwaArticles.outerHeight()/2
			// 	},50);
			// }
		}
		this.setPosition();
		
		$('svg#poly').remove();
		this.article.append( this.calcSvg() );
	} else {
		this.body.removeClass('viewWhatWeAre');
		this.wrap.removeClass('active');
	}
}
/**
* svg六角形polygon計算
* @extends WwaModal
*/
WwaModal.prototype.calcSvg = function( delay ){
	var $viewBoxW = this.article.outerWidth(),
		$viewBoxH = this.article.outerHeight(),
		$point_rect1h =  $viewBoxW * ( 79 / 631 ),
		$point_rect2v =  $viewBoxH * ( 79 / 225 ),
		$point_rect4h =  $viewBoxW * ( 552 / 631 ),
		$point_rect5v =  $viewBoxH * ( 146 / 225 );

		$svg = '<svg version="1.1" id="poly" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + $viewBoxW +' ' + $viewBoxH + '" style="enable-background:new 0 0 ' + $viewBoxW +' ' + $viewBoxH + ';" xml:space="preserve"><style type="text/css">.st0{fill:url(#SVGID_1_);}</style><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="' + $viewBoxW + '" y1=" ' + $viewBoxH/2 +  '" x2="1.818989e-12" y2="' + $viewBoxH/2 +  '" gradientTransform="matrix(1 0 0 -1 0 ' + $viewBoxH +  ')"><stop  offset="0" style="stop-color:#FFC61F"/><stop offset="1" style="stop-color:#FF6D1F"/></linearGradient><polygon class="st0" points="' + $point_rect1h +',0 0,'+ $point_rect2v +' 0,' + $viewBoxH +' '+ $point_rect4h + ','+ $viewBoxH + ' ' + $viewBoxW + ',' + $point_rect5v + ' ' + $viewBoxW + ',0 "/></svg><i class="closeWwaModalButton"></i>'

		return $svg;
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

	var $wrapOffset_left = this.wwaArticles.offset().left,
		$wrapOffset_top = this.wwaArticles.offset().top,
		$imgOffset_left = this.img.offset().left,
		$imgOffset_top = this.img.offset().top,	
		$imgWidth = this.img.width(),
		$imgScalable = $imgWidth * 1.15 - $imgWidth;

	// console.log( '$wrapOffset_left', $wrapOffset_left,'$wrapOffset_top', $wrapOffset_top,'$imgOffset_left', $imgOffset_left,'$imgOffset_top', $imgOffset_top,'$imgWidth', $imgWidth );
		
	$articleOffset = {
		left: 	Math.ceil( $imgOffset_left - $wrapOffset_left + $imgWidth + $imgScalable ),
		right: 	Math.ceil( this.wwaArticles.width() - ($imgOffset_left - $wrapOffset_left) + $imgScalable ),
		top:  	Math.ceil( $imgOffset_top - $wrapOffset_top )
	};

	if( this.wrap.hasClass('bottomFix') ) $articleOffset.top = $articleOffset.top/2;

	if( this.wrap.hasClass('notesRight') ){
		this.article.css({
			top: $articleOffset.top,
			left: $articleOffset.left
		});
	} else if( this.wrap.hasClass('notesLeft') ){
		this.article.css({
			top: $articleOffset.top,
			right: $articleOffset.right
		});			
	} else {
		this.article.css({
			top: $articleOffset.top - this.img.height(),
			left: $imgOffset_left - $wrapOffset_left + $imgWidth / 2
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