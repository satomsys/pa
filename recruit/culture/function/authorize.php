<?php
/**
* 初回アクセス時アカウント認証用。
* instagram account
* seveninc.anonymous@gmail / seven0214
*
* master userID: 5320366701
* access token: 5320366701.6c39fc0.5453885bc0ba4fc8bc46a130c1d5b458
* media userID: 20917341 ( 佐藤 )
*/

		// 設定
		$client_id = '6c39fc08335e427e90aca0e0c81cccc4' ;		// クライアントID
		$client_secret = 'a3cc00fe90b64cceb8402f22dfa059a5' ;		// クライアントシークレット
		$redirect_uri = explode( '?' , ( !isset($_SERVER['HTTPS']) || empty($_SERVER['HTTPS']) ? 'http://' : 'https://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] )[0] ;		// このプログラムを設置するURL
		$scope = 'public_content+follower_list' ;

		// セッションスタート
		session_start() ;

		// HTML用
		$html = '' ;

		// [手順2] リクエストトークン($_GET["code"])とアクセストークンの交換
		if( isset($_GET['code']) && !empty($_GET['code']) && isset($_SESSION['state']) && !empty($_SESSION['state']) && isset($_GET['state']) && !empty($_GET['state']) && $_SESSION['state'] == $_GET['state'] ){
			
		}

		// [手順1] 初回アクセスの場合、ユーザーをアプリ認証画面へアクセスさせる
		else
		{
			// CSRF対策
			session_regenerate_id( true ) ;
			$state = sha1( uniqid( mt_rand() , true ) ) ;
			$_SESSION['state'] = $state ;

			// リダイレクトさせる
			header( 'Location: https://api.instagram.com/oauth/authorize/?client_id=' . $client_id . '&redirect_uri=' . rawurlencode( $redirect_uri ) . '&scope=' . $scope . '&response_type=code&state=' . $state ) ;

			exit ;
		}

		// エラー時の処理
		if( isset($error) || !empty($error) )
		{
			$html = '<p><mark>' . $error . '</mark>もう一度、認証をするには、<a href="' . explode( '?' , $_SERVER['REQUEST_URI'] )[0] . '">こちら</a>をクリックして下さい。</p>' ;
		}

	?>