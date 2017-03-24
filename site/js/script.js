$(function(){

var $viewitem = $('.viewitem'),
	$fadeTarget = $('.gofade'),
	$timer = null,
	$offsetTop,
	$scrollBarWidth = window.innerWidth - document.body.clientWidth,
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
* スワイプの方向を取得（SP
* @see Position
* @return $dir {string} left /right スワイプの方向
*/
function touchDirection( activeModal, e ){
		var $pos = Position( e ), //x and y	
			// $contentWidth = $activeModal.outerWidth();
			$contentHalfWidth = activeModal.outerWidth() / 2;

			$dir = $contentHalfWidth < $pos.x ? 'right' : 'left';

			return $dir;
	// })		
}

/*
* タップ・スワイプの現在位置を得る
*/
function Position( e ){
	var x = e.originalEvent.touches[0].pageX;
	var y = e.originalEvent.touches[0].pageY;
	x = Math.floor(x);
	y = Math.floor(y);
	var pos = {'x':x , 'y':y};
	return pos;
}


/**
* テンプレート挿入時の、モーダルのpadding設定
* @param modal { obj } モーダルのオブジェクト
*/
function modalPosTop( ){
	var $navBar = $('.navbar'),
		$navBarHeight = $navBar.outerHeight();

	$(window).on('reisze', function(){
		$navBarHeight = $navBar.outerHeight();
	})

	$('.modal').css({
		'top': $navBarHeight + 'px'
	});
			
}

});