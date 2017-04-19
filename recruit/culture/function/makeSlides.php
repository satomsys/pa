<?php

/**
* メインヴィジュアルのスライドとそれに対応するナビの生成
*/
class Slides {
	public $slidenum;
	public $mainslide;
	public $slidenav;

	/**
	* スライドの枚数をセット
	* @constructor
	*/
	public function __construct( $num ){
		$this->setSlideNum( $num );
	}
	public function setSlideNum( $num ){
		$this->slidenum = $num;
	}


	public function mainslide(){
		for( $i=1; $i <= $this->slidenum; $i++ ){
			$this->mainslide .= '<div><img src="img/_test/gallery' . $i . '.jpg" data-preview="#style' . $i . '" class="cultureVisual_img"></div>';
		}

		return $this->mainslide;
	}

	public function slidenav(){
		for( $i=1; $i <= $this->slidenum; $i++ ){
			$this->slidenav .= '<li class="sliderNav_item"><img src="img/_test/nav-gallery' . $i . '.jpg" width="60"></li>';
		}

		return $this->slidenav;		
	}

}
?>