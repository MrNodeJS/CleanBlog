$(document).ready(function () {
	$.getJSON('https://baconipsum.com/api/?callback=?',
		{'type': 'all-meat', 'paras': '4'},
		function (baconGoodness) {
			if (baconGoodness && baconGoodness.length > 0) {
				$("#dummyWord").html('');
				for (var i = 0; i < baconGoodness.length; i++)
					$("#dummyWord").append('<p>' + baconGoodness[i] + '</p>');
				$("#dummyWord").show();
			}
		});
});