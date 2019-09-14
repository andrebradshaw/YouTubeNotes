var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

function convertTime2Secs(str){
	var timehours = /^\d+:\d+:\d+$/.exec(str);
	var timemins = /^\d+:\d+$/.exec(str);
	var hour = timehours ? parseInt(/^\d+(?=:)/.exec(timehours[0])[0]) : 0;
	var mins = timemins ? parseInt(/^\d+(?=:)/.exec(timemins[0])[0]) : 0;
	var secs = timemins ? parseInt(/\d+$/.exec(timemins[0])[0]) : 0;
	return ((hour*(60*60))+(mins*60)+(secs));
}


async function getTimestamp(){
  var sharebtn = Array.from(cn(document,'style-scope ytd-button-renderer style-default size-default')).filter(el=> /Share/i.test(el.innerText));
  sharebtn[0].click();
  await delay(633);
  var time = gi(document,'start-at-timestamp').value;
  var timestamp = convertTime2Secs(time);
  await delay(333);
  var closer = Array.from(tn(document,'yt-icon')).filter(el=> el.getAttribute('icon') == 'close');
  if(closer && closer[0]) closer[0].click();
  return timestamp;
}

async function createNotesHTML(){
  var timestamp = await getTimestamp();
  var videoId = reg(/(?<=youtube\.com\/watch\?v=|youtu\.be\/).+?(?=\?|$)/.exec(window.location.href),0);
  var linkOutput = encodeURIComponent(`https://youtu.be/${videoId}?t=${timestamp}`);
  var notes = prompt('add notes here');
  var send_to_sheets = `https://script.google.com/macros/s/AKfycbx6XDqCQ9-YIfIL6sQm36hjOIKugbkLgTFqZQtVkdja6aSHlZQ/exec?link=${linkOutput}&notes=${notes}`;
  window.open(send_to_sheets);
  console.log(linkOutput);
}

// createNotesHTML();

// var search_input = prompt('enter your search');
// var search_notes = `https://script.google.com/macros/s/AKfycbwHbKfS4H8wh5i_zihRgq0QtfMmk5zQ7IHBq8ND6xc/dev?search=${encodeURIComponent(search_input)}`;
// window.open(search_notes);


function createYTnotesHTML(){
  if(gi(document,'youtube_note_search_container')) gi(document,'youtube_note_search_container').outerHTML = '';

  var cont = ele('div');
  attr(cont, 'id', 'youtube_note_search_container');
  attr(cont, 'style', `position: fixed; top: 5%; left: 10%; width: 300px; z-index: 13100;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head,'style',`display: grid; grid-template-columns: 91% 9%; background: #060338; border: 1.3px solid #04021f; border-top-left-radius: 0.3em; border-top-right-radius: 0.3em; cursor: move; padding: 6px;`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var htxt = ele('div');
  attr(htxt, 'style', `grid-area: 1 / 1; color: #fff;`)
  head.appendChild(htxt);
  htxt.innerText = 'YouTube Notes';
  
  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 2; width: 30px; height: 30px; cursor: pointer;`);

  head.appendChild(cls);
  cls.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = closeView;

  var cbod = ele('div');
  attr(cbod,'style',`display: grid; grid-template-rows; grid-gap: 10px; border: 1.3px solid #04021f; border-bottom-left-radius: 0.3em; border-bottom-right-radius: 0.3em; background: #9c9c9c; padding: 12px;`);
  cont.appendChild(cbod);
  
  var setnote = ele('input');
  attr(setnote,'id','save_note_val');
  attr(setnote,'placeholder','Save note');
  attr(setnote,'style',`width: 100%; border: 1px solid transparent; border-radius: 0.3em; padding: 2px;`);
  cbod.appendChild(setnote);

  var searchnote = ele('input');
  attr(searchnote,'id','search_note_val');
  attr(searchnote,'placeholder','Search notes');
  attr(searchnote,'style',`width: 100%; border: 1px solid transparent; border-radius: 0.3em; padding: 2px;`);
  cbod.appendChild(searchnote);

//   var 

}
createYTnotesHTML()
