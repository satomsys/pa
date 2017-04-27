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
			'同じ志を持つ<br>
			仲間と共に、<br>
			成功へ突き進む。',
			'何がお客様の<br>
			ためになるのか<br>
			徹底的に、本質を掴む',
			'上司と部下、<br>
			立場に関係なく<br>
			楽しむひとときがある。',
			'どんなプランが最適か、<br>
			お互いの意見を汲み取り<br>
			お客様の事を<br>
			お客様以上に考え抜く',
			'仲間と一致団結して、<br>
			仕事を動かしていく。<br>
			社員同士の強い絆がある。',
			'お互いに切磋琢磨する<br>
			同期ミーティングで、<br>
			さらなる成長をめざす。',
			'部署の垣根を超えて、<br>
			ダイナミックに<br>
			プロジェクトは進む。',
			'先輩も後輩も、
			<br>
			同じ人間同士。<br>
			尊敬し合って働く。',
			'男女関係なく、<br>
			気軽に相談できる。<br>
			心地よい人間関係がある。'
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