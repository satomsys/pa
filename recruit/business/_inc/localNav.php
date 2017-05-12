 <?php
 /**
 * $activePage { str } vision / about アクティブなページ
 */

    if( $activePage == 'vision' ){$visionIsActive = true;}
        elseif( $activePage == 'about' ){$aboutIsActive = true;}
 ?>
<div class="section section-nav">
  <div class="wrap">
    <nav class="careerSelectNav">
      <ul>
        <li class="careerSelectNav_vision<?php if( isset( $visionIsActive ) ) echo' active'; ?>" data-genre="vision"><a <?php if( ! isset($visionIsActive) ) echo 'href="vision.html"'; ?>>VISION</a></li>
        <li class="careerSelectNav_about<?php if( isset( $aboutIsActive ) ) echo' active'; ?>" data-genre="about"><a <?php if( ! isset($aboutIsActive) ) echo 'href="about.html" target="_blank"'; ?>>ABOUT</a></li>
      </ul>
    </nav>
  </div>
</div>