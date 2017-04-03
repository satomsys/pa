$w=null,
$ua=null;
	
$(function(){

	$w = $(window),
	$n = null,
	$ua = deviceIs( $w, 780 ),
	$timer = null,
	$fadeTarget = $('.fade'),
	$scrollEvents = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll',
	$menuButton = $('.menuButton'),
	$pageIndex = $('.pageIndex'),
	$loadingAnim = $('.loadingAnim');

	if( $ua == 'mobile' ) $n = new Nav();



/**
* loading animation
*/
if( $loadingAnim ){
	var $loadFunc = function(){
		$loadingAnim.addClass('loaded');
		$loadingAnim.find('.loadingAnim_borderLeft').on( 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', function(){
			$loadingAnim.fadeOut('slow', function(){ 
				$loadingAnim.remove();
			});
		});
	};

	$w.on('load', $loadFunc );
	// //////// follow
	setTimeout(function(){
		if( ! $('.loadingAnim').hasClass('loaded') ){
			$loadFunc;
		}
	}, 2000 );
}



/**
* デバイス判定（幅
* @see  deviceIs
*/
$w.on( 'load resize', function( e ){
	$ua = deviceIs( $w, 780 );
	//ナビpadding
	if( $ua == 'desktop' && $n ) $n.reset();

	console.log( $ua );
} );



/**
* fade in
*/
if( $fadeTarget.length ){
	$w.on( 'load', function(){
		targetFade( $fadeTarget, $w );			
	});

	$w.on( 'scroll resize', function( e ){
		clearTimeout( $timer );
		
		$timer = setTimeout(function(){
			targetFade( $fadeTarget, $w );
		}, 100 );
	});
}



/**
* メニュークリック
*/
$menuButton.on('click', function( e ){
	if( $ua !== 'mobile') return;
	e.stopPropagation();

	$n.switchClass();
});



/**
* 下層ページインデックスアニメ
*/
if( 0 < $pageIndex.length ){
	$w.on('load', function(){
		if( $loadingAnim.length ){
			$loadingAnim.find('.loadingAnim_borderLeft').on( 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', function(){
				setTimeout( function(){ 
					$pageIndex.addClass('inview');
				},150 );
			});		
		} else {
			setTimeout( function(){ 
				$pageIndex.addClass('inview');
			},150 );
		}
	});
}


});



/**
* フェードインエフェクトの設定 要素のdata-delayでdelay値設定。
* @param $fadeTarget { obj } .fadeTargetクラスの要素
* @param wdw { obj } windowオブジェクト
*/
 function targetFade( fadeTarget, wdw ){
	var $scrollVal = wdw.scrollTop(),
		$wH = wdw.innerHeight(),
		$windowBottom = $scrollVal + $wH - 50;

	$.each( fadeTarget, function( e ){
		var $this = $(this),
			$offsetTop = $this.offset().top,
			$delay = $this.attr('data-delay');

		if( $offsetTop < $windowBottom ){
			$this.addClass('fadeIn').css({
				'transition-delay': $delay + 's'
			});
		}
	}); 	
 }



/**
* 幅により仮にデバイス判定しUI変更。
*/
function deviceIs( w, breakPoint ){
	var $w = w,
		$windowWidth = $w.innerWidth();

	return $windowWidth < breakPoint ? 'mobile' : 'desktop';
}



/**
* モバイル向けメニュー
* @constructor
*/
Nav = function(){
	this.button = $('.menuButton'),
	this.menu = $('.sitenav'),
	this.body = $('body');

	this.body.css({
		'padding-top': $('.header').height()
	});
}
/**
* ナビ開閉のためのクラス差し替え
* @extends Nav
*/
Nav.prototype.switchClass = function(){
	if( this.body.hasClass('menuOpen') ){
		// this.scrollCansel( 'go' )
		this.body.removeClass('menuOpen');

		this.button.removeClass('menuOpen');
		this.body.addClass('menuClosed');
	}  else {
		// this.scrollCansel( 'cansel' )
		this.body.removeClass('menuClosed');
		this.body.addClass('menuOpen');
		this.button.addClass('menuOpen');
	}
}
/**
* スクロールキャンセル
* @extends Nav
*/
Nav.prototype.scrollCansel = function( cansel ){
	if( cansel == 'cansel'){
		console.log( this )
		this.body.on('touchmove.noScroll', function(e) {
		    e.preventDefault();
		});
	}else{
		this.body.off('.noScroll');
	}
}
/**
* リセット用
* @extends Nav
*/
Nav.prototype.reset = function( cansel ){
	this.body.removeClass('menuOpen').css({'padding-top': 0});
	this.button.removeClass('menuOpen');
	this.body.addClass('menuClosed');
}



// $(function(){
//     $('a[href^=#]').click(function(){
//         var speed = 300;
//         var href= $(this).attr("href");
//         var target = $(href == "#" || href == "" ? 'html' : href);
//         var position = target.offset().top;
//         $("html, body").animate({scrollTop:position}, speed, "swing");
//         return false;
//     });
// });


/**
* scrollDepth
*/
// $(function() {
//     $.scrollDepth();
// });


//  $( '.backToTop' ).on( 'click', function(){
//      var $icon = $( this );
//      $icon.addClass( 'moving' );
//      $( 'html,body' ).animate({ scrollTop: 0 }, 'slow', function(){
//          $icon.removeClass( 'moving' );
//      } );
//  } )
// } );


