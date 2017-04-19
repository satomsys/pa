<?php

/**
* メインヴィジュアルのスライドとそれに対応するナビの生成
*/
class Slides {
	public $slidenum;
	public $mainslide;
	public $slidenav;
	public $randomArg;

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

	/**
	* スライドの数で乱数を格納した配列を造る
	*/
	public function makeRandomArg( ){
		$this -> randomArg = array();
		$randomNum;

		for( $i=1; $i <= $this->slidenum; $i++ ){
			array_push($this->randomArg, $i);
		}
		shuffle( $this->randomArg );
		return $this->randomArg;
	}


	/**
	* メインヴィジュアル
	*/
	public function mainslide(){
		for( $i=1; $i <= $this->slidenum; $i++ ){
			$this->mainslide .= '<div><img src="img/gallery' . $i . '.jpg" data-preview="#style' . $i . '" class="cultureVisual_img"></div>';
		}
		// foreach( $this->randomArg as $random ){
		// 	$this->mainslide .= '<div><img src="img/gallery' . $random . '.jpg" data-preview="#style' . $random . '" class="cultureVisual_img"></div>';
		// }
		return $this->mainslide;
	}

	/**
	* ナビ
	*/
	public function slidenav(){
		for( $i=1; $i <= $this->slidenum; $i++ ){
			$this->slidenav .= '<li class="sliderNav_item"><img src="img/nav-gallery' . $i . '.jpg" width="85"></li>';
		}

		// foreach( $this->randomArg as $random ){
		// 	$this->slidenav .= '<li class="sliderNav_item"><img src="img/nav-gallery' . $random. '.jpg" width="85"></li>';
		// }		

		return $this->slidenav;		
	}

}
?>