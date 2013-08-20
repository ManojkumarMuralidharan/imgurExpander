var viewport_width=document.documentElement.clientWidth;
var viewport_height=document.documentElement.clientHeight;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});*/
	  
	  imgurfy();
});


function imgurfy(){
 
	var aTags = document.querySelectorAll('a');
   for (var i = 0; i < aTags.length; i++) {
    // divs[i].addEventListener('click', click);
   // console.log(a.href);
   var href=aTags[i].href;
   var RegExp_pic  =/http:\/\/i.imgur.com\/.*[jpg|png|gif|jpeg]$/;
   var RegExp_com = /http:\/\/imgur.com\/.*[^jpg|png|gif|jpeg]$/;
//var RegExp_pic  = /^[http:\/\/(i.imgur.com\/).*(jpg|png|gif|jpeg)]{1}/;
 //  var RegExp_com = /^[http:\/\/imgur.com(\/){0,1}(?!jpg|png|jpeg|gif)]{1}/;
   if (RegExp_pic.test(href)&&aTags[i].className!='thumbnail '){
//populateDiv(aTags[i],href.split(/.(?:png|jpg|gif|jpeg)/)[0].split(/.*imgur.com\//)[1]);
getImageData(href.split(/.(?:png|jpg|gif|jpeg)/)[0].split(/.*imgur.com\//)[1],aTags[i]);
	}else if (RegExp_com.test(href)&&aTags[i].className!='thumbnail '){
		getImageData(href.split(/.*imgur.com\/(?:.*\/)*/)[1],aTags[i]);
	}	
	
  }
 function display(divImgurHolder){
	 			divImgurHolder.className='imgurPopup displ';
 };
	  
function hide(divImgurHolder){
			divImgurHolder.className='imgurPopup hidden';
 };
 function populateDiv(ahrefTag,href,imageData){
	var parentNodeTag=ahrefTag.parentNode;
	var divImgurHolder = document.createElement('div');
	divImgurHolder.className='imgurPopup hidden';
	//divImgurHolder.id=''+i;
	parentNodeTag.appendChild(divImgurHolder);

	var img = document.createElement('img');
      img.src = href;
      img.setAttribute('alt', 'imgurPic');
      divImgurHolder.appendChild(img);
	  /*if(imageData){
		var width = (imageData.width>viewport_width)?viewport_width*0.85:imageData.width;
		var height = (imageData.height>viewport_height)?viewport_height*0.85:imageData.height;
		img.style.width=width+'px';
	    img.style.height=height+'px';
	  }*/
	  
	  ahrefTag.onmouseover=function(Node){
	  return function(){display(Node);};
	  }(divImgurHolder);
	  
	  ahrefTag.onmouseout=function(divImgurHolder){
	   return function(){hide(divImgurHolder);};
	  }(divImgurHolder);
	  
	  divImgurHolder.onmouseover=function(Node){
	  return function(){display(Node);};
	  }(divImgurHolder);
	  
	  divImgurHolder.onmouseout=function(divImgurHolder){
	   return function(){hide(divImgurHolder);};
	  }(divImgurHolder);
 };
 function getImageData(link,ahrefTag){
	var imageName=link;
	 var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function(event) {
		if (xhr.readyState == 4) {
		  if(xhr.status == 200) {
			// Great success: parse response with JSON
			  //alert(xhr.responseText);
			  //document.body.innerHTML=xhr.responseText;
			var parsed = JSON.parse(xhr.responseText);
			console.log(xhr.responseText);
			var html = '';
			var imageData={
			"link":parsed.data.link,
			"width":parsed.data.width,
			"height":parsed.data.height};
			//document.querySelector('#music').innerHTML = html;
			populateDiv(ahrefTag,parsed.data.link,imageData);
			return imageData;

		  } else {
			// Request failure: something bad happened
		  }
		}
	  };
	  var req_url='https://api.imgur.com/3/image/';
	  xhr.open('GET', req_url+imageName);
	  xhr.setRequestHeader('Content-Type', 'application/json');
	  xhr.setRequestHeader('Authorization','Client-ID 9b3609fa0e9ea29');
	  xhr.send();
 }
 
 };
 
 
 