
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
	  
	  imgurfy();
});
function imgurfy(){
 
	var aTags = document.querySelectorAll('a');
  for (var i = 0; i < aTags.length; i++) {
   // divs[i].addEventListener('click', click);
  // console.log(a.href);
  var href=aTags[i].href;
  var RegExp  = /.*imgur.com.*/;
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