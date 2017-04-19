$(function(){

var $careerSelectNav = $('.careerSelectNav').find('li'),
	$careerSelectContent = $('.careerSelectContent'),
	$startPos = $('.section-genre').offset().top,
	$timer = null;


	$w.on('resize load', function(){	
		$timer = setTimeout( function(){
			clearTimeout( $timer );
			$startPos = $('.section-genre').offset().top;		
		}, 500);
	});

	$careerSelectNav.on('click', function( e ){
		e.stopPropagation();
		e.preventDefault();

		var $self = $(this),
			$genre = $self.data('genre'),
			$target = $('.careerSelectContent' + '.' + $genre);


		if( $self.hasClass('active') || $self.hasClass('comingsoon') ) return;

		$('body,html').animate({scrollTop: $startPos}, 'fast');
		
		$careerSelectContent.fadeOut(300).removeClass('active');
		$careerSelectNav.removeClass('active');


		$target.fadeIn(300).addClass('active');
		$($('.' + $self.attr('class'))).addClass('active');

	});

});