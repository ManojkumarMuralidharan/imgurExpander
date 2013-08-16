myURL=undefined;
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){ //onUpdated should fire when the selected tab is changed or a link is clicked 
    chrome.tabs.getSelected(null,function(tab){
        myURL=tab.url;
		chrome.tabs.query({'active': true,'currentWindow':true},function(tab){
		//Be aware 'tab' is an array of tabs even though it only has 1 tab in it
		  chrome.tabs.sendMessage(tab[0].id,{type: "dom-loaded2", color: "#F00",greeting:"hello"}, function(response){
			//response will be the arrayWithAllTheInfoInIt that we sent back
			//you can do whatever you want with it here
			//I will just output it in console
			console.log(response.farewell);
		  });
		});
    });
});

/*	
	
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
		console.log("background");
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		var requestObject = {"backgroundKey": "backgroundValue"};
        chrome.tabs.sendRequest(activeInfo.tabId, requestObject, 
            function(value) { // used below
			console.log(value); 
		});
   });
}); 

/*chrome.browserAction.onClicked.addListener(function(tab) {
	
	chrome.extension.sendMessage({ command: "selected-tab" },function(response) {
              console.log(response.farewell);
        });

	}*/
/*	
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.getSelected(null,function(tab) {
        chrome.tabs.create( { url: "http://w3patrol.com/search.php?q=" +tab.url } );
  });
});
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "dom-loaded2":
            //alert(request.data.myProperty);
			alert('test');
			console.log('Test');
			callContent();
        break;
    }
    return true;
});


	/*
	function responseCallback(value) { // used below
    console.log(value); 
}



chrome.tabs.onSelectionChanged.addListener(
    function handleSelectionChange(tabId, selectInfo) {
        var requestObject = {"backgroundKey": "backgroundValue"};
        chrome.tabs.sendRequest(tabId, requestObject, 
            responseCallback);
    }
);*/




chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});


// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
		case "dom-loaded2":
            //alert(request.data.myProperty);
			console.log('background.js message received'+request.type);

			//callContent();
		/*chrome.tabs.query({
				active: true,               // Select active tabs
				lastFocusedWindow: true     // In the current window
			}, function(array_of_Tabs) {
				// Since there can only be one active tab in one active window, 
				//  the array has only one element
				var tab = array_of_Tabs[0];
				chrome.tabs.sendMessage(tab.id,  {type: "dom-loaded2", color: "#F00"}, function(response) {
					//console.log(response.farewell);
					console.log('sent from background to conetnt');
				});
			});
			/*chrome.tabs.getCurrent(function(tab){
			chrome.tabs.sendMessage(tab.id,  {type: "dom-loaded2", color: "#F00"}, function(response) {
			console.log(response.farewell);
			console.log('sent from background to conetnt');
			});
			});*/
        break;
    }
    return true;
});

/*
var callContent = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab[0].id, {type: "dom-loaded2", color: "#F00"});
        // setting a badge
        chrome.browserAction.setBadgeText({text: "red!"});
    });
};
// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab[0].id, {type: "colors-div", color: "#F00"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "red!"});
	});
};/
/*chrome.tabs.getAllInWindow(null, function(tabs){
  tabs.forEach(function(tab){
    alert("Hello world\n" + tab.url);
  });
});*/