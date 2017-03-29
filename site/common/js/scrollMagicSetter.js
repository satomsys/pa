$(function(){

	$pallaraxWrap = $('.pWrap'),	
	controller = new ScrollMagic.Controller();

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
});