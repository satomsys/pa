<div class="wjuQ_modals">
  <?php 

	  for( $i=1; $i<=8; $i++ ){
	  	$fileName = 'modal-0' . $i . '.php';
	  	// if( file_exists( $fileName ) ) echo $fileName;
	    include 'modal-0' . $i . '.php';  	
	  }
    

  ?>
</div>
