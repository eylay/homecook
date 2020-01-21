$(document).ready(function () {

	$('#finalize input[name=address]').change(function () {
		if ($('#new-address').is(':checked')) {
			$('#new-address-div').slideDown();
			$('#new-address-div input[name=new_address]').attr('required', 'required');
		}else {
			$('#new-address-div').slideUp();
			$('#new-address-div input[name=new_address]').removeAttr('required');
		}
	});

	$('[data-action=delete-from-cart]').click(function () {

		var form = $(this).parents('form');
		var row = $(this).parents('tr');
		var token = form.find('input[name=_token]').val();
		var formdata = {_token:token};
		var amount = Number($(this).data('amount'));
		var sum = Number($('#sum').data('amount'));

		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': token
			}
		})
		$.ajax({
			url: form.attr('action'),
			type: "POST",
			data: formdata,
			success: function(data){
				row.remove();
				total = Number(data);
				$('#sum').attr('data-amount', total);
				$('#sum span').text(total.toLocaleString());
			}
		});

	});

	$('[data-action=add], [data-action=negative]').click(function () {
		var action = $(this).data('action');
		var input = $(this).siblings('.input').find('.form-control');
		var value = isNaN(input.val()) ? 0 : Number(input.val());
		if (action == 'add') {
			value++;
		}else if(value > 1) {
			value--;
		}
		input.val(value);
	});

	$('[data-action=add-to-cart]').click(function () {
		var col = $(this).parents('.food-col');
		var form = $(this).parents('form');
		var count = form.find('input[name=count]').val();
		var food = form.find('input[name=food]').val();
		var token = form.find('input[name=_token]').val();
		var formdata = {count:count, food:food, _token:token};
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': token
			}
		})
		$.ajax({
			url: form.attr('action'),
			type: "POST",
			data: formdata,
			success: function(data){
				form.hide();
				col.append(data);
			}
		});
	});

});