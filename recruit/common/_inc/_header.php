<?php
/**
* アクティブなクラスをつける
* @param $nowActive {str} アクティブなディレクトリを示す
* @param $thisDir {str} 各ディレクトリ
* @return {str} 'active'
*/
function isActive( $nowActive, $thisDir ){
    if( $nowActive == $thisDir ) return 'active';
}

/**
* ナビ中相対パスを返す
* @param $nowActive {str} アクティブなディレクトリを示す
* @param $thisDir {str} 各ディレクトリ
* @param $isChild {bool} 子ページの場合 true  ../を返す
* @return href=""リンク
*/
function dirPath( $nowActive, $thisDir, $isChild ){
  $dir = $isChild ? '../' : '';
  $path = $thisDir == 'index' && $isChild ? '../' : $dir . $thisDir . '/';
  if( $nowActive !== $thisDir ) return 'href="' . $path . '"';
}
?>
  <div class="loadingAnim">
    <!-- ***** loadingAnimation -->
    <div class="loadingAnim_inner">
        <i class="border loadingAnim_borderTop"></i>
        <i class="border loadingAnim_borderRight"></i>
        <i class="border loadingAnim_borderBottom"></i>
        <i class="border loadingAnim_borderLeft"></i>
        <img src="/recruit/common/img/logo.gif" width="218" class="logo" alt="PROPERTY AGENT"><br>
        <img src="/recruit/common/img/header-text-recruiting.svg" class="recruiting" width="97" alt="RECRUITING 2018">
    </div>
    <!-- ///// loadingAnimation -->
  </div>

  <!-- ***** header -->
  <header class="header">
    <div class="wrap header_wrap">
      <h1 class="header_logo">
        <a <?php echo dirPath($nowActive, 'index', $isChild); ?> >
          <img src="/recruit/common/img/logo.gif" width="218" class="logo" alt="PROPERTY AGENT">
          <img src="/recruit/common/img/header-text-recruiting.svg" class="recruiting" width="97" alt="RECRUITING 2019"></a>
      </h1>

      <nav class="header_buttons">
        <ul>
          <li class="button button-nav button-companyinfo"><a href="http://www.propertyagent.co.jp/" target="_blank">COMPANY INFO.</a></li>
          <li class="button button-nav button-mypage"><a href="https://job.rikunabi.com/2018/company/r914110010/" target="_blank">MY PAGE</a></li>
          <li class="button button-nav button-entry"><a href="https://job.rikunabi.com/2018/company/entry/confirm" target="_blank">ENTRY</a></li>
        </ul>
      </nav>
      <span class="menuButton"><i class="menuButton_bars"><i></i></i></span>
    </div>
  </header>
  <!-- ///// header -->

  <!-- ***** navigation -->
  <nav class="sitenav">
    <ul class="navList">
      <li class="navList_child <?php echo isActive($nowActive, 'business');?>"><a <?php echo dirPath($nowActive, 'business', $isChild); ?>>BUSINESS</a></li>
      <li class="navList_child comingsoon"><a>PERSON</a></li>
      <li class="navList_child comingsoon"><a>CAREER</a></li>
      <li class="navList_child comingsoon"><a>CULTURE</a></li>
      <li class="navList_child comingsoon"><a>WHY JOIN US</a></li>
      <li class="navList_child <?php echo isActive($nowActive, 'recruiting');?>"><a <?php echo dirPath($nowActive, 'recruiting', $isChild); ?>>RECRUITING</a></li>
      <li class="navList_child navList_child-buttons">
         <ul>
          <li class="button button-nav button-companyinfo"><a href="http://www.propertyagent.co.jp/" target="_blank">COMPANY INFO.</a></li>
          <li class="button button-nav button-mypage"><a href="https://job.rikunabi.com/2018/company/r914110010/" target="_blank">MY PAGE</a></li>
          <li class="button button-nav button-entry"><a href="https://job.rikunabi.com/2018/company/entry/confirm" target="_blank">ENTRY</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  <!-- ///// navigation -->