/*
Copyright 2014 Francesco Faraone

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

$(function() {

	var set = function(name, value) {
		var backgroundPage = chrome.extension.getBackgroundPage(); 
		backgroundPage.config.set(name, value, backgroundPage.initialize);
	}

	var localizeLabels = function() {
		$('[id^=lbl_]').each(
			function() {
				console.log($(this));
				var msg = chrome.i18n.getMessage($(this).attr('id'));
				if (msg != undefined && msg != '') {
					$(this).text(msg);
				}

			}
		);
	}

	var fillGeneralSettings = function() {
		var backgroundPage = chrome.extension.getBackgroundPage(); 
		var settings = backgroundPage.config.getSettings();
		if (settings.country != undefined) {
			$('#country').val(settings.country);
		}

		if (settings.gmail != undefined && settings.gmail == true) {
			$('#gmail').attr('checked', 'checked');
		}

		if (settings.phone != undefined) {
			$('#phone').val(settings.phone);
			removeFieldsFromValidator();
			$('#phone_form').empty();
			$('#phone_form').load(
				chrome.extension.getURL('/html/' + settings.phone + '.html'),
				function() {
					addFieldsToValidator();
					localizeLabels();
					fillPhoneSettings();
					bindPhoneSettingsEvents();
					validateSettings();
				}
			);
		}
	}

	var bindGeneralSettingsEvents = function() {
		$('#phone').change(
			function() {
				var selected_model = $(this).val();
				set('phone', selected_model);
				removeFieldsFromValidator();
				$('#phone_form').empty();
				$('#phone_form').load(
					chrome.extension.getURL('/html/' + selected_model + '.html'),
					function() {
						addFieldsToValidator();
						localizeLabels();
						fillPhoneSettings();
						bindPhoneSettingsEvents();
						validateSettings();
					}
				);
			}
		);

		$('#country').change(
			function() {
				var selected_country = $(this).val();
				set('country', selected_country);
			}
		);

		$('#gmail').change(
			function() {
				set('gmail', $(this).is(':checked'));
			}
		);
	}

	var fillPhoneSettings = function() {
		var backgroundPage = chrome.extension.getBackgroundPage(); 
		var settings = backgroundPage.config.getSettings();
		if (settings.protocol != undefined) {
			$('#proto_' + settings.protocol).attr('checked', 'checked');
		}

		if (settings.host != undefined) {
			$('#host').val(settings.host);
		}

		if (settings.port != undefined) {
			$('#port').val(settings.port);
		}

		if (settings.username != undefined) {
			$('#username').val(settings.username);
		}

		if (settings.password != undefined) {
			$('#password').val(settings.password);
		}

		if (settings.account != undefined) {
			$('#account').val(settings.account);
		}
	}


	var bindPhoneSettingsEvents = function() {
		$('#proto_http').change(
			function() {
				if ($(this).is(':checked')) {
					set('protocol', 'http');
					$('#port').val('80');
				}
			}
		);
		$('#proto_https').change(
			function() {
				if ($(this).is(':checked')) {
					set('protocol', 'https');
					$('#port').val('443');
				}
			}
		);

		$('#host').on('keyup change', function() {
			set('host', $(this).val());
		});

		$('#port').on('keyup change', function() {
			set('port', parseInt($(this).val()));
		});

		$('#username').on('keyup change', function() {
			set('username', $(this).val());
		});

		$('#password').on('keyup change', function() {
			set('password', $(this).val());
		});

		$('#account').on('keyup change', function() {
			set('account', $(this).val());
		});
	}

	var addFieldsToValidator = function() {
		var validator = $('#settings').data('bootstrapValidator');
		validator.addField($('#host'), {
			trigger: 'blur keyup',
			message: 'The hostname is not valid',
			validators: {
				notEmpty: {
					message: chrome.i18n.getMessage('lbl_vld_host_required')
				}
			}
		});
		validator.addField($('#port'), {
			trigger: 'blur keyup',
			message: 'The port is not valid',
			validators: {
				between: {
					message: chrome.i18n.getMessage('lbl_vld_port_range'),
					min: 1,
					max: 65535,
					type: 'range',
					inclusive: true
				},
				digits: {
					message: chrome.i18n.getMessage('lbl_vld_port_numeric')
				}
			}
		});
		validator.addField($('#username'), {
			trigger: 'blur keyup',
			message: 'The username is not valid',
			validators: {
				notEmpty: {
					message: chrome.i18n.getMessage('lbl_vld_username_required')
				}
			}
		});
		validator.addField($('#password'), {
			trigger: 'blur keyup',
			message: 'The password is not valid',
			validators: {
				notEmpty: {
					message: chrome.i18n.getMessage('lbl_vld_password_required')
				}
			}
		});
		validator.addField($('#account'), {
			trigger: 'change blur keyup',
			message: 'The account is not valid',
			validators: {
				notEmpty: {
					message: chrome.i18n.getMessage('lbl_vld_account_required')
				}
			}
		});
	}
	var removeFieldsFromValidator = function() {
		var validator = $('#settings').data('bootstrapValidator');
		$(['host', 'port', 'username', 'password', 'account']).each(function(idx, obj) {
			validator.removeField(obj);
		});
	}

	var configureValidator = function() {
		$('#settings').bootstrapValidator({
			message: 'This value is not valid',
			fields: {
				country: {
					trigger: 'change blur',
					message: 'The country is not valid',
					validators: {
						notEmpty: {
							message: chrome.i18n.getMessage('lbl_vld_country_required')
						}
					}
				},
				phone: {
					trigger: 'change blur',
					message: 'The phone model is not valid',
					validators: {
						notEmpty: {
							message: chrome.i18n.getMessage('lbl_vld_phone_required')
						}
					}
				},
			}
		});		
	}
	var validateSettings = function() {
		var validator = $('#settings').data('bootstrapValidator');
		validator.validate();
	}
	var init = function() {
		configureValidator();
		localizeLabels();
		fillGeneralSettings();
		bindGeneralSettingsEvents();
		validateSettings();
	}

	init();
});