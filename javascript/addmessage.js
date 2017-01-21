$(function(){
	$('form[name=add-message]').submit(
		function(){
			$.post($(this).attr('action'), $(this).serialize(), function(json) { alert(json); }, 'json'); 
			return false; 
	});
});