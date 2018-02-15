// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

$(document).ready(function () {
	$('#input_submit').on('click',function makeGrid() {
	event.preventDefault();
	$('tr').remove()
		for (var rows=0;rows<$('#input_width').val();rows++){
			$('#pixel_canvas').append('<tr></tr>');
			for (var cols = 0;cols<$('#input_height').val(); cols++) {
				$('tr').eq(rows).append('<td></td>');
			}}
	});
	var colorPicked = $('#colorPicker').val();
	$('#colorPicker').on('change', function() {
	  colorPicked = $('#colorPicker').val();
	});
	$('#pixel_canvas').on('click', 'td', function(x) {
	  $(x.target).css("background", colorPicked);
	});
});