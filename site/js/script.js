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


$viewitem.on('click', function( e ){
	e.stopPropagation();
	e.preventDefault();

	var $target = $(this ),
		$modalName = $target.attr( 'data-modal');


	if(! $('#modals').data('loaded') ){
		$('#modals').load( '_modal.html', function(){

			$targetModal = $( '.modal[data-modalTag="' + $modalName + '"]'),
			$modal = $( this ).find('.modal'),
			$modalMaxCount = $modal.length;

			$modal.eq( 0 ).find('.modalPrev').hide();
			$modal.eq($modalMaxCount -1 ).find('.modalNext').hide();
			
			modalPosTop();
			
			setTimeout( function(){
				openModal( $targetModal );		
				closeModal( $targetModal );
			}, 200)	
			$('#modals').data('loaded', true )

		})		
	} else {
			$targetModal = $( '.modal[data-modalTag="' + $modalName + '"]'),
			$modal = $('.modal'),
			
			modalPosTop();
			
			setTimeout( function(){
				openModal( $targetModal );		
				closeModal( $targetModal );
			}, 200)			
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
* モーダル開く
* @param activeModal { jQuery obj } アクティブなモーダルを取得→代入
* @see changeModal
*/
function openModal( activeModal ){
	var $targetModal = activeModal,
		$dir,
		$moveVal;

	if( $targetModal.length ){		

		//スクロールバーがある場合はスクロールイベント拒否（for windows）
		if(! $scrollBarWidth ){
			 $('body').addClass('openModal');	
		} else {
			$('body').on($scrollEvents , function(e){
				e.preventDefault();
			} );					
		}


		$('.main').on('touchmove.noScroll', function(e){
			e.preventDefault();
		} );

		
		$( '.modal' ).removeClass('active');
		$targetModal.addClass('active');

		var $prevIcon = $targetModal.find('.modalPrev'),
			$nextIcon = $targetModal.find('.modalNext');

		// //タップ開始
		// $targetModal.on('touchstart', function( e ){
		// 	$pos = Position( e );
		// 	$targetModal.data( 'startPos', $pos.x );
		// })
		// //スワイプ開始
		// $targetModal.on('touchmove', function( e ){
		// 	e.stopPropagation();

		// 	var $pos = Position( e ),
		// 		$contentHalfWidth = $targetModal.outerWidth() / 2;
			
		// 	$moveVal = $pos.x;

		// 	$dir = $contentHalfWidth < $moveVal ? 'right' : 'left';

		// });
		// //スワイプ終了
		// $targetModal.on('touchend',function( e ){
		// 	var $leavedPos = Number($targetModal.data('startPos')),
		// 		$distance = $moveVal - $leavedPos,
		// 		$distance = 0 < $distance ? '' : $distance*-1;

		// 	if( 70 < $distance ){
		// 		// if( $leavedPos < $moveVal ){
		// 		//   changeModal( $targetModal, 'next' );
		// 		// } else{
		// 		// 	changeModal( $targetModal, 'prev' );									
		// 		// }					
		// 		$dir == 'right' ? changeModal( $targetModal, 'next' ) : changeModal( $targetModal, 'prev' );				
		// 	}

		// });

		// 前へ
		$prevIcon.on( 'click', function( e ){
			e.stopPropagation();
			changeModal( $targetModal, 'prev' );
		});

		//次へ
		$nextIcon.on( 'click', function( e ){
			e.stopPropagation();
			changeModal( $targetModal, 'next' );
		});
	}
}	


/**
* モーダル閉じる
* @param activeModal { jQuery obj } アクティブなモーダルを取得→代入
*/
function closeModal( ){
	// console.log( activeModal );
	var $closeIcon = $( '.modal__close' );

	$closeIcon.on('click', function(){
		$(this).closest('.modal').removeClass('active');

		//スクロールイベントの許可
		if( $scrollBarWidth ) {
			$('body').off($scrollEvents);					
		}

		$('body').removeClass('openModal');
		$('.main').off('.noScroll');	



	});
}

/**
* モーダル遷移する
* @param activeModal { jQuery obj } アクティブなモーダルを取得→代入
* @param dir { string } next / prev 
*/
function changeModal( activeModal, dir ){
	var $activeModal = activeModal,		
		$modalIndex = Number( $activeModal.attr('data-modalIndex') ),
		$nextModalIndex = Number( $modalIndex ) + 1,
		$prevModalIndex = Number( $modalIndex ) - 1 ,
		$nextModal = $('.modal[ data-modalIndex="' + $nextModalIndex + '"]'),
		$prevModal = $('.modal[ data-modalIndex="' + $prevModalIndex + '"]'),
		$nextShowModalIndex = null;

	$activeModal.removeClass( 'active' );

	console.log( $modalMaxCount,$modalIndex );

	if( dir == 'last' ){
		$showModal = $('.modal[ data-modalIndex="' + $modalMaxCount + '"]' );
	} else {
		if( dir == 'next' || dir == 'right' ){
			$showModal = $nextModal;
		} else if ( dir == 'prev' || dir == 'left' ){
			$showModal = $prevModal;
		} else {
			$('.modal').removeClass( 'active' );
			console.log( 'next or previous is not found' )
		}						
	}

	console.log( $showModal )

	openModal( $showModal );
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