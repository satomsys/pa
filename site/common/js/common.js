var $w,
	$ua;
	
$(function(){

	$w = $(window),
	$ua = deviceIs( $w, 768 ),
	$timer = null,
	$fadeTarget = $('.fade'),
	$scrollEvents = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll',
	$menuButton = $('.menuButton'),
	$pallaraxWrap = $('.pWrap'),	
	controller = new ScrollMagic.Controller(),
	$pageIndex = $('.pageIndex');

	if( $ua == 'mobile' ) $n = new Nav();


/**
* デバイス判定（幅
*/
$w.on( 'load resize', function( e ){
	clearTimeout( $timer );
	$timer = setTimeout( function(){
		$ua = deviceIs( $w, 768 );
	},300);

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
		}, 50 );
	});
}



/**
* scorllMagic.js
*/
$.each( $pallaraxWrap, function () {

	var $this = $(this), 
		$img = $this.find('.pImg'), 
		$wrapHeight = $this.outerHeight(),
		$imgHeight = $img.outerHeight(),
		$durationVal = $(window).height() + $wrapHeight,
		$moveVal = $w.innerHeight() / 4.5 * -1;
		// $moveVal = $wrapHeight - $imgHeight ;

	/**
	* @param triggerElement{elem} 動作の開始地点となる要素を指定 指定した要素が画面の中央に来た時に開始。
	* @param duration {int } 動作の開始から終了までのスクロール高さ
	* @param offset {int} 基本の開始地点をどれだけズラすか	
	*/
	new ScrollMagic.Scene({ 
		triggerElement: this,
		triggerHook: "onEnter",
		duration: $durationVal 
	}).setTween($img, { 
		y:  $moveVal
	}).addTo(controller);
});



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
		setTimeout( function(){ 
			$pageIndex.addClass('inview');
		},150 );
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

	return $windowWidth < breakPoint ? 'mobile' : 'desktop'
}


/**
* モバイル向けメニュー
*/

Nav = function(){
	this.button = $('.menuButton'),
	this.menu = $('.sitenav'),
	this.body = $('body');

	this.body.css({
		'padding-top': $('.header').height()
	});
}

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


