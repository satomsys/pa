<?php
include './authorize.php';
/**
* instagram account
* seveninc.anonymous@gmail / seven0214
*
* userID: 5320366701
* access token: 5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458
* user id: 5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458
*/

		// 設定
		$client_id = '6c39fc08335e427e90aca0e0c81cccc4' ;		// クライアントID
		$client_secret = 'a3cc00fe90b64cceb8402f22dfa059a5' ;		// クライアントシークレット
		$client_secret = 'a3cc00fe90b64cceb8402f22dfa059a5' ;		// クライアントシークレット
		$redirect_uri = explode( '?' , ( !isset($_SERVER['HTTPS']) || empty($_SERVER['HTTPS']) ? 'http://' : 'https://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] )[0] ;		// このプログラムを設置するURL
		$scope = 'public_content+follower_list' ;

		// セッションスタート
		session_start() ;

		// HTML用
		$html = '' ;

		// [手順2] リクエストトークン($_GET["code"])とアクセストークンの交換
		if( isset($_GET['code']) && !empty($_GET['code']) && isset($_SESSION['state']) && !empty($_SESSION['state']) && isset($_GET['state']) && !empty($_GET['state']) && $_SESSION['state'] == $_GET['state'] )
		{

			$access_token = '5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458';
			//↓こっちは取得できた。
			$request_url = 'https://api.instagram.com/v1/users/20917341/media/recent/?access_token=' . $access_token ;		// リクエストURL			

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

	var_dump( $obj );


			// エラー判定
			if( !$obj || !isset($obj->user->id) || !isset($obj->user->username) || !isset($obj->user->profile_picture) || !isset($obj->access_token) )
			{
				$error = 'データを上手く取得できませんでした。' ;
			}
			else
			{
				// 各データを整理
				$user_id = $obj->user->id ;		// ユーザーID
				$user_name = $obj->user->username ;		// ユーザーネーム
				$user_picture = $obj->user->profile_picture ;		// ユーザーアイコン
				$access_token = $obj->access_token ;		// アクセストークン

				// セッション終了
				$_SESSION = array() ;
				session_destroy() ;

				// 出力する
				$html .=  '<h2>実行結果</h2>' ;
				$html .=  '<dl>' ;
				$html .=  	'<dt>ユーザーID</dt>' ;
				$html .=  		'<dd>' . $user_id . '</dd>' ;
				$html .=  	'<dt>ユーザー名</dt>' ;
				$html .=  		'<dd>' . $user_name . '</dd>' ;
				$html .=  	'<dt>アイコン画像</dt>' ;
				$html .=  		'<dd><img class="_img" src="' . $user_picture . '"></dd>' ;
				$html .=  	'<dt>アクセストークン</dt>' ;
				$html .=  		'<dd>' . $access_token . '</dd>' ;
				$html .=  '</dl>' ;
			}
		}

		// [手順1] 初回アクセスの場合、ユーザーをアプリ認証画面へアクセスさせる
		else
		{
			// CSRF対策
			// session_regenerate_id( true ) ;
			$state = sha1( uniqid( mt_rand() , true ) ) ;
			$_SESSION['state'] = $state ;

			// リダイレクトさせる
			header( 'Location: https://api.instagram.com/oauth/authorize/?client_id=' . $client_id . '&redirect_uri=' . rawurlencode( $redirect_uri ) . '&scope=' . $scope . '&response_type=code&state=' . $state ) ;

			exit ;
		}

		// エラー時の処理
		if( isset($error) || !empty($error) ){
			echo '<!--<p><mark>' . $error . '</mark>もう一度、認証をするには、<a href="' . explode( '?' , $_SERVER['REQUEST_URI'] )[0] . '">こちら</a>をクリックして下さい。</p>-->' ;
		}

	?>