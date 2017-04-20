<?php
// include 'authorize.php';
/**
* instagram account
* seveninc.anonymous@gmail / seven0214
*
* userID: 5320366701
* access token: 5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458
* user id: 5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458
*/

/**
* json decodeがPHP5.1に対応していないためテスト不可。
* @link http://blog.livedoor.jp/shoooo1/archives/6064462.html
*/
   if (!function_exists('json_encode')) {
        require_once 'JSON.php';
            function json_encode($value) {
                $s = new Services_JSON();
                return $s->encodeUnsafe($value);
            }

            function json_decode($json, $assoc = false) {
                $s = new Services_JSON($assoc ? SERVICES_JSON_LOOSE_TYPE : 0);
                return $s->decode($json);
            }
    }



	$access_token = '5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458';
	//↓こっちは取得できた。
	$request_url = 'https://api.instagram.com/v1/users/3893313940/media/recent/?access_token=' . $access_token ;		// リクエストURL			

	/**
	* アイテムデータをJSONで取得
	*/
	$curl = curl_init();

	curl_setopt( $curl, CURLOPT_URL, $request_url );
	curl_setopt( $curl, CURLOPT_HEADER, 1 );
	curl_setopt( $curl , CURLOPT_SSL_VERIFYPEER , false ) ;								// 証明書の検証を行わない
	curl_setopt( $curl , CURLOPT_RETURNTRANSFER , true ) ;								// curl_execの結果を文字列で返す
	curl_setopt( $curl , CURLOPT_TIMEOUT , 5 ) ;										// タイムアウトの秒数

	$res1 = curl_exec( $curl );
	$res2 = curl_getinfo( $curl );

	curl_close( $curl );

	$json = substr( $res1, $res2['header_size'] );

	// JSONデータをオブジェクト形式に変換する
	$obj = json_decode( $json ) ;

	
	/**
	* エラー判定
	*/	
	if( !$obj || !isset($obj->user->id) || !isset($obj->user->username) || !isset($obj->user->profile_picture) || !isset($obj->access_token) ){
		$error = 'データを上手く取得できませんでした。' ;
	}
	// if( !isset( $error ) && !empty( $error ) ){
	// 	$html = '<p><mark>' . $error . '</mark>もう一度、認証をするには、<a href="' . explode( '?' , $_SERVER['REQUEST_URI'] )[0] . '">こちら</a>をクリックして下さい。</p>' ;

	// 	return;
	// }

	/**
	* HTML格納
	*/

	// 投稿者名含む 投稿野詳細データ配列オブジェクト
	$data = $obj->data;

	// var_dump( $data );
	$dataMax = count($data) - 1;

	$data_htmlSet = array();
	$dataCount = 0;
	$instaBox = '';

	foreach( $data as $post ){
		$data_htmlSet[$dataCount] = array(
			'image' => $post->images->standard_resolution->url,
			'text' => $post->caption->text,
			'link' => $post->link
		 );

		 $instaBox .= $dataCount == 0 ? '<ul class="instaBox_list">' : '';
		 $instaBox .= <<<EOD
<li class="instaBox_list_post">
	<a class="instaBox_image" data-fancybox="group" data-src="#insta{$dataCount}">
	    <figure>
	      <img src="{$data_htmlSet[$dataCount]['image']}" alt="">
	    </figure>
	</a>
	<article id="insta{$dataCount}" class="cultureModal cultureModal-insta">
	    <img class="cultureModal-insta_img" src="{$data_htmlSet[$dataCount]['image']}" alt="">
	    <div  class="cultureModal-insta_text" >
	    	{$data_htmlSet[$dataCount]['text']}

	    	<div class="button button-linkToInsta"><a href="{$data_htmlSet[$dataCount]['link']}" target="_blank">instagramで開く</a></div>
	    </div>

	</article>
</li>
EOD;
		 $instaBox .= $dataCount == $dataMax ? '</ul>' : '';

		$dataCount++;
	}



	// var_dump( $data_htmlSet );
	// var_dump( $obj->data );

	?>