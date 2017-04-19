 <?php
 /**
 * $activePerson { str } アクティブなメンバーを指定
 * $isChild{boolean} Person第２階層まで対応
 */
    $path = $isChild ? '../' : '';

    if( $activePerson == 'ohtsuji' ){$ohtsujiIsActive = true;}
        elseif( $activePerson == 'shiraishi' ){$shiraishiIsActive = true;}
        elseif( $activePerson == 'matsuyama' ){$matsuyamaIsActive = true;}
        elseif( $activePerson == 'kitsuda' ){$kitsudaIsActive = true;}
        elseif( $activePerson == 'yano' ){$yanoIsActive = true;}
        elseif( $activePerson == 'campbell' ){$campbellIsActive = true;}

 ?>
 <aside class="otherPerson">
    <header class="otherPerson_index">
        OTHER PERSON
    </header>
    <nav class="otherPerson_nav">
        <ul>
            <li<?php if( isset($ohtsujiIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($ohtsujiIsActive) ) echo 'href="'. $path . 'ohtsuji/"' ?>><img src="<?php echo $path; ?>img/nav-img-ohtsuji.jpg" alt=""></a>
            </li>
            <li<?php if( isset($shiraishiIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($shiraishiIsActive) ) echo 'href="'. $path . 'shiraishi/"' ?>><img src="<?php echo $path; ?>img/nav-img-shiraishi.jpg" alt=""></a>
            </li>
            <li<?php if( isset($matsuyamaIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($matsuyamaIsActive) ) echo 'href="'. $path . 'matsuyama/"' ?>><img src="<?php echo $path; ?>img/nav-img-matsuyama.jpg" alt=""></a>
            </li>
            <li<?php if( isset($kitsudaIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($kitsudaIsActive) ) echo 'href="'. $path . 'kitsuda/"' ?>><img src="<?php echo $path; ?>img/nav-img-kitsuda.jpg" alt=""></a>
            </li>
            <li<?php if( isset($yanoIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($yanoIsActive) ) echo 'href="'. $path . 'yano/"' ?>><img src="<?php echo $path; ?>img/nav-img-yano.jpg" alt=""></a>
            </li>
            <li<?php if( isset($campbellIsActive)) echo ' class="current"' ?>>
                <a <?php if( !isset($campbellIsActive) ) echo 'href="'. $path . 'campbell/"' ?>><img src="<?php echo $path; ?>img/nav-img-campbell.jpg" alt=""></a>
            </li>
        </ul>
    </nav>
</aside>