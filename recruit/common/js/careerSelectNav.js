$(function(){

var $careerSelectNav = $('.careerSelectNav').find('li'),
	$careerSelectContent = $('.careerSelectContent');

	$careerSelectNav.on('click', function( e ){
		e.stopPropagation();
		e.preventDefault();

		var $self = $(this),
			$genre = $self.data('genre'),
			$target = $('.careerSelectContent' + '.' + $genre);


		if( $self.hasClass('active') || $self.hasClass('comingsoon') ) return;

		$careerSelectContent.fadeOut(300).removeClass('active');
		$careerSelectNav.removeClass('active');

		$target.fadeIn(300).addClass('active');
		$($('.' + $self.attr('class'))).addClass('active');


		// console.log( $careerSelectContent )  
		// console.log( $careerSelectContent.filter( $( '.' + $genre ) )) ;
	})

});