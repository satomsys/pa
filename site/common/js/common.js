
$(function(){
    $('a[href^=#]').click(function(){
        var speed = 300;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});



/**
* scrollDepth
*/
$(function() {
    $.scrollDepth();
});

/***
*　back to top スクロール
*/

// $( function(){

//  var $timer = null;

//  $(window).on( 'scroll', function(){

//      if( $timer == null ){

//          $timer = setTimeout( function(){
                
//              var $icon = $( '.backToTop' ); //icon
//              var $visible = $icon.is( ':visible' );
//              var $scrollVal = $( window ).scrollTop(); //スクロール値
//              var $under = $( 'body' ).height() - ( $scrollVal + $( window ).height() ); //ページの残りの長さ

//              if( $scrollVal > 750 && 500 > $under ){
//                  if(! $visible ){
//                      $icon.fadeIn( 'slow' );
//                  }
//              } else {
//                  $icon.fadeOut( 'slow' );
//              }

//              $timer = null;

//          }, 1000 );
//      }

//  } );


//  $( '.backToTop' ).on( 'click', function(){
//      var $icon = $( this );
//      $icon.addClass( 'moving' );
//      $( 'html,body' ).animate({ scrollTop: 0 }, 'slow', function(){
//          $icon.removeClass( 'moving' );
//      } );
//  } )
// } );


