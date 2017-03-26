$(function(){

	var $w = $(window),
		$ua = deviceIs( $w, 768 ),
		$timer = null,
		$fadeTarget = $('.gofade'),
		$scrollEvents = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

/**
* fade in
*/
if( $fadeTarget.length ){
	$window = $(window);

	$window.on( 'load', function(){
		targetFade( $fadeTarget, $window );			
	});

	$timer = setTimeout(function(){
		$window.on( 'scroll', function( e ){
			clearTimeout( $timer );
			targetFade( $fadeTarget, $window );
		});
	}, 400 );
}

$w.on( 'load resize', function( e ){
	clearTimeout( $timer );
	$timer = setTimeout( function(){
		$ua = deviceIs( $w, 768 );
	},300);
} );		

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
$(function() {
    $.scrollDepth();
});


//  $( '.backToTop' ).on( 'click', function(){
//      var $icon = $( this );
//      $icon.addClass( 'moving' );
//      $( 'html,body' ).animate({ scrollTop: 0 }, 'slow', function(){
//          $icon.removeClass( 'moving' );
//      } );
//  } )
// } );


