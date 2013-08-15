function imgurfy(){
 
	var aTags = document.querySelectorAll('a');
  for (var i = 0; i < aTags.length; i++) {
   // divs[i].addEventListener('click', click);
  // console.log(a.href);
  var href=aTags[i].href;
  var RegExp  = /.*imgur.com.*.jpg/;
   if (RegExp.test(href)&&aTags[i].className!='thumbnail '){
	var parentNodeTag=aTags[i].parentNode;
	var divImgurHolder = document.createElement('div');
	divImgurHolder.className='imgurPopup hidden';
	divImgurHolder.id=''+i;
	parentNodeTag.appendChild(divImgurHolder);
	var img = document.createElement('img');
      img.src = href;
      img.setAttribute('alt', 'imgurPic');
      divImgurHolder.appendChild(img);
	  
	  aTags[i].onmouseover=function(Node){
	  return function(){display(Node);};
	  }(divImgurHolder);
	  aTags[i].onmouseout=function(divImgurHolder){
	   return function(){hide(divImgurHolder);};
	  }(divImgurHolder);
	  
	}  
	
  }
 function display(divImgurHolder){
	 			divImgurHolder.className='imgurPopup displ';
 };
	  
function hide(divImgurHolder){
			divImgurHolder.className='imgurPopup hidden';
 };
 };
 
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
/*
chrome.extension.onMessage.addListener(function(request, sender) { 

    //chrome.tabs.getSelected(null, function(){
		  console.log("background");
          console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		  imgurfy();
		  sendResponse({farewell: "goodbye"});
	  
  //  }); 
 
});
	*/
 
	  
	  
	  
