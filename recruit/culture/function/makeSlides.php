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
	// public function makeRandomArg( ){
	// 	$this -> randomArg = array();
	// 	$randomNum;

	// 	for( $i=1; $i <= $this->slidenum; $i++ ){
	// 		array_push($this->randomArg, $i);
	// 	}
	// 	shuffle( $this->randomArg );
	// 	return $this->randomArg;
	// }


	/**
	* メインヴィジュアル
	*/
	public function mainslide(){

		$text = array(
			'',//blank
			'Copyスライド1枚め<br>
			Copyスライド1枚め',
			'何がお客様のためになるのか<br>
			徹底的に、本質を掴む',
			'Copyスライド3枚め<br>
			Copyスライド3枚め',
			'どんなプランが最適か、<br>
			お互いの意見を汲み取り<br>
			お客様の事をお客様以上に考え抜く',
			'Copyスライド5枚め<br>
			Copyスライド5枚め',
			'Copyスライド6枚め<br>
			Copyスライド6枚め',
			'Copyスライド7枚め<br>
			Copyスライド7枚め',
			'Copyスライド8枚め<br>
			Copyスライド8枚め',
			'Copyスライド9枚め<br>
			Copyスライド9枚め'
			);

		for( $i=1; $i <= $this->slidenum; $i++ ){
			$textBox = '<div class="slideImg_text"><span>' . $text[$i] .'</span></div>';
			$slideClass = 'class="slideImg slideImg-' . $i . '"';
			$img = '<img src="img/gallery' . $i . '.jpg" data-preview="#style' . $i . '" class="cultureVisual_img">';

			$this->mainslide .= '<div '.$slideClass . '>'  . $img . $textBox . '</div>';
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