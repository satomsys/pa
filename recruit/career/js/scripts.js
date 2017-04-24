
/**
* fancybox
*/
$("[data-fancybox]").fancybox({
});

$(".modal_close").on('click', function(){
	$.fancybox.close();
})