$(function(){

	var $w = $(window),
		$ua = deviceIs( $w, 768 ),
		$timer = null;


	$w.on( 'load resize', function( e ){

		clearTimeout( $timer );
		$timer = setTimeout( function(){
			$ua = deviceIs( $w, 768 );
		},300);
	} );		




});



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


