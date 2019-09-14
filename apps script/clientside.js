var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);


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

createNotesHTML();

var search_input = prompt('enter your search');
var search_notes = `https://script.google.com/macros/s/AKfycbwHbKfS4H8wh5i_zihRgq0QtfMmk5zQ7IHBq8ND6xc/dev?search=${encodeURIComponent(search_input)}`;
window.open(search_notes);

