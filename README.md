hangup /cgi-bin/ConfigManApp.com?Id=34&Command=3 , OK = 3

http://192.168.107.101/cgi-bin/ConfigManApp.com?Id=34&Command=1&Number=687787105&Account=@ipcentrex.gestionvoz.net


-- possibly usefull

// var settings = new Store("settings", {});


// var putil = i18n.phonenumbers.PhoneNumberUtil.getInstance();


// var trigger_call = function(e) {

// 	var default_country_code = settings.get("default_country_code");
// 	if (default_country_code != "ES") {
// 		chrome.notifications.create("", {
// 			"type": "basic",
// 			"iconUrl": "/icons/icon48.png",
// 			"title": "Turtle dialer: invalid configuration",
// 			"message": "Invalid country code"
// 		}, function() {});		
// 		return;
// 	}
// 	var host = settings.get("host");
// 	if (host === undefined || host == null || host.length < 1) {
// 		chrome.notifications.create("", {
// 			"type": "basic",
// 			"iconUrl": "/icons/icon48.png",
// 			"title": "Turtle dialer: invalid configuration",
// 			"message": "Invalid host"
// 		}, function() {});		
// 		return;
// 	}

// 	var protocol = settings.get("protocol");

// 	if (protocol === undefined || protocol == null || protocol.length < 1) {
// 		chrome.notifications.create("", {
// 			"type": "basic",
// 			"iconUrl": "/icons/icon48.png",
// 			"title": "Turtle dialer: invalid configuration",
// 			"message": "You must specify the protocol"
// 		}, function() {});		
// 		return;		
// 	}

// 	var username = settings.get("username");
// 	var password = settings.get("password");

// 	var url_to_call = protocol + "://";

// 	if (username != null && username.length > 0) {
// 		url_to_call = url_to_call + username + ":" + password + "@";
// 	}
// 	url_to_call = url_to_call + host;



// 	if (e.selectionText) {
// 		var number_to_call = e.selectionText;

// 		var parsed_number = null;
// 		try {
// 			parsed_number = putil.parse(number_to_call, default_country_code);
// 		} catch (e) {
// 			chrome.notifications.create("", {
// 				"type": "basic",
// 				"iconUrl": "/icons/icon48.png",
// 				"title": "Turtle dialer",
// 				"message": "The number '" + number_to_call + "' is invalid"
// 			}, function() {});		
// 			return;					
// 		}

// 		number_to_call = parsed_number.getNationalNumber();
// 		var model = settings.get("model");
// 		var account = settings.get("account");
// 		if (model == "yealink_t2x") {
// 			url_to_call = url_to_call + "/cgi-bin/ConfigManApp.com?Id=34&Command=1&Number=" + 
// 				number_to_call + "&Account=@" + account;	
// 			console.log(url_to_call);
// 			var xhr = new XMLHttpRequest();
// 			xhr.open('GET', url_to_call, true);
// 			xhr.onreadystatechange = function() {
// 				console.log(xhr.readyState);
// 			  if (xhr.readyState == 4) {
// 			  	console.log(xhr.responseText);
// 			  	if (xhr.responseText != "1") {
// 					chrome.notifications.create("", {
// 						"type": "basic",
// 						"iconUrl": "/icons/icon48.png",
// 						"title": "Turtle dialer",
// 						"message": "Cannot dial " + number_to_call + ": check your phone configuration!"
// 					}, function() {});
// 			  	}
// 			  }
// 			}
// 			xhr.send();
// 			chrome.notifications.create("", {
// 				"type": "basic",
// 				"iconUrl": "/icons/icon48.png",
// 				"title": "Turtle dialer",
// 				"message": "Calling " + number_to_call
// 			}, function() {});
// 		}

// 	}
// }

// chrome.contextMenus.create({
//     "title": chrome.i18n.getMessage("l10nContextMenuItem"),
//     "contexts": ["selection"],
//     "onclick" : trigger_call
//   });


//GData-Version: 3.0


