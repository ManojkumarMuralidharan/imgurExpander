	chrome.browserAction.onClicked.addListener(function(tab) {
	
	chrome.extension.sendMessage({ command: "selected-tab" },function(response) {
              console.log(response.farewell);
        });

	}
