 <?php
 /**
 * $activePerson { str } アクティブなメンバーを指定
 * $isChild{boolean} Person第２階層まで対応
 */
    $path = $isChild ? '../' : '';

    if( $activePerson == 'hayashi' ){$hayashiIsActive = true;}
        elseif( $activePerson == 'nishigaki' ){$nishigakiIsActive = true;}
        elseif( $activePerson == 'mizutani' ){$mizutaniIsActive = true;}
 ?>
 <aside class="otherStory">
    <header class="otherStory_index">
        OTHER STORY
    </header>
    <nav class="otherStory_nav">
	    <ul>
	        <li<?php if( isset($mizutaniIsActive)) echo ' class="current"' ?>>
	            <a <?php if( !isset($mizutaniIsActive) ) echo 'href="'. $path . 'mizutani/"' ?>><img src="<?php echo $path; ?>img/index-img-mizutani.jpg" alt=""></a>
	        </li>
	        <li<?php if( isset($nishigakiIsActive)) echo ' class="current"' ?>>
	            <a <?php if( !isset($nishigakiIsActive) ) echo 'href="'. $path . 'nishigaki/"' ?>><img src="<?php echo $path; ?>img/index-img-nishigaki.jpg" alt=""></a>
	        </li>
	        <li class="comingsoon" <?php if( isset($hayashiIsActive)) echo ' class="current"' ?>>
	            <a <?php if( !isset($hayashiIsActive) ) echo 'href="'. $path . 'hayashi/"' ?>><img src="<?php echo $path; ?>img/index-img-hayashi.jpg" alt=""></a>
	        </li>
	    </ul>
    </nav>
</aside>