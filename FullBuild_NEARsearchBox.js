/* start utils functions */
function convertTime2Secs(str) {
  var timehours = /^\d+:\d+:\d+$/.exec(str);
  var timemins = /^\d+:\d+$/.exec(str);

  var hour;
  if (timehours != null) hour = parseInt(/^\d+(?=:)/.exec(timehours[0])[0]);
  var mins;
  if (timehours != null) mins = parseInt(/(?<=\d+:)\d+(?=:)/.exec(timehours[0])[0]);
  var secs;
  if (timehours != null) secs = parseInt(/\d+$/.exec(timehours[0])[0]);

  var hour;
  if (timehours == null) hour = 0;
  var mins;
  if (timemins != null) mins = parseInt(/^\d+(?=:)/.exec(timemins[0])[0]);
  var secs;
  if (timemins != null) secs = parseInt(/\d+$/.exec(timemins[0])[0]);

  return ((hour * (60 * 60)) + (mins * 60) + (secs));
}
/* end utils functions */

/* start action functions */
document.getElementById('menu-container').getElementsByTagName('ytd-menu-renderer')[0].getElementsByTagName('yt-icon')[4].click();

/*action functions */

/* start DOM observers */
var domObserver1 = new MutationObserver((mChanges, ob) => {
  var paperBox = document.getElementsByTagName('paper-listbox');
  if (paperBox.length > 0) {
    paperBox[paperBox.length - 1].getElementsByTagName('ytd-menu-service-item-renderer')[1].click();
    ob.disconnect();
    return;
  }
});

domObserver1.observe(document, {
  childList: true,
  subtree: true
});

var domObserver2 = new MutationObserver((mChanges, ob) => {
  if (document.getElementById('transcript') != null) {
    createSearchPop();
    ob.disconnect();
    return;
  }
});

domObserver2.observe(document, {
  childList: true,
  subtree: true
});
/* end DOM observers */

// var first = new Promise(res=>{res(clickMenu())});

// first.then(clickTrans()).then(getTrans())


function createSearchPop() {

  var transList = document.getElementById('transcript').getElementsByClassName('cue-group style-scope ytd-transcript-body-renderer');

  var transArr = [];
  for (i = 0; i < transList.length; i++) {
    var time = transList[i].getElementsByClassName('cue-group-start-offset style-scope ytd-transcript-body-renderer')[0].innerText;
    var txt = transList[i].getElementsByClassName('cues style-scope ytd-transcript-body-renderer')[0].innerText;
    transArr.push([time, txt]);
  }

  var wordCount = transArr.map(itm => {
    return itm[1].match(/\w+/g).length;
  });

  var textBody = '';
  transArr.forEach(itm => {
    textBody = textBody + itm[1] + ' {' + itm[0] + '} ';
  });

  var createDiv = document.createElement("div");
  createDiv.setAttribute("id", "popup_win");
  document.body.appendChild(createDiv);
  createDiv.style.display = "inline-block";
  createDiv.style.position = "fixed";
  createDiv.style.top = "10%";
  createDiv.style.textAlign = "left";
  createDiv.style.left = "43%";
  createDiv.style.width = "30%";
  createDiv.style.height = "20%";
  createDiv.style.border = "1px solid LightSlateGray ";
  createDiv.style.background = "LightSteelBlue";
  createDiv.style.borderRadius = "1em";
  createDiv.style.padding = "3px";
  createDiv.style.zIndex = "10000";

  var closebtn = document.createElement("button");
  document.getElementById("popup_win").appendChild(closebtn);
  closebtn.setAttribute("id", "btn_close");
  document.getElementById("btn_close").innerText = "+";
  closebtn.style.position = "absolute";
  closebtn.style.background = "transparent";
  closebtn.style.display = "inline-block";
  closebtn.style.transform = "scale(2.9, 2.9) rotate(-45deg)";
  closebtn.style.borderRadius = "1em";
  closebtn.style.padding = "1px";
  closebtn.style.boxShadow = "1px";
  closebtn.style.border = "1px";
  closebtn.style.userSelect = "none";
  closebtn.style.color = "Crimson";

  var createModElm = document.createElement("input");
  document.getElementById("popup_win").appendChild(createModElm);
  createModElm.setAttribute("id", "box_nearSearch");
  createModElm.setAttribute("placeholder", 'keyword "NEAR" other Keyword');
  createModElm.style.width = "95%";
  createModElm.style.height = "32px";
  createModElm.style.padding = "6px";
  createModElm.style.border = "1px solid LightSteelBlue";
  createModElm.style.background = "white";
  createModElm.style.borderRadius = "1em";

  var createbtn = document.createElement("button");
  document.getElementById("popup_win").appendChild(createbtn);
  createbtn.setAttribute("id", "btn_box");
  document.getElementById("btn_box").innerText = "Search";
  createbtn.style.background = "LightSlateGray";
  createbtn.style.border = "1px solid LightSlateGray";
  createbtn.style.width = "100%";
  createbtn.style.height = "33px";
  createbtn.style.borderRadius = "1em";
  createbtn.style.color = "white";

  function close() {
    document.body.removeChild(document.getElementById("popup_win"));
  }

  function searchTrans() {
    if (document.getElementById('box_nearSearch').value.length > 3) {
      var yt_id = /(?<=v=)\w+/.exec(window.location.href)[0];
	  var searchInput = document.getElementById('box_nearSearch').value.replace(/\s+near\s+/gi, '.{0,180}?');
      var regXsearch = new RegExp(searchInput + '.+?\\{.+?\\}', 'gi');
      var matches = textBody.match(regXsearch);	
	  

      if(matches != null){
      	var timestamps = Array.from(matches).map(itm => {
			var i1 = 'https://youtu.be/' + yt_id + '?t=' + convertTime2Secs(/\{(.+?)\}/.exec(itm)[1]);
			var i2 = itm.replace(/\{.+?\}/g, '');
        	return [i1,i2];
      	});

          for (t = 0; t < timestamps.length; t++) {

			var linkCont = document.createElement('div');
			document.getElementById("popup_win").appendChild(linkCont);
			linkCont.setAttribute('id', 'results-cont'+t);
			linkCont.style.padding = "6px";
			linkCont.style.border = "1px solid LightSlateGray";
			linkCont.style.borderRadius = ".5em";
			linkCont.style.background = "white";
           
            var matchLinks = document.createElement('a');
            document.getElementById("results-cont"+t).appendChild(matchLinks);
            matchLinks.setAttribute('href', timestamps[t][0]);
			matchLinks.style.fontsize = '1.2em';
            matchLinks.innerText = timestamps[t][1];
          }
      }else{
		alert('no matches');	
	}
    }
  }
  document.getElementById("btn_box").addEventListener("click", searchTrans);
  document.getElementById("btn_close").addEventListener("click", close);

}
