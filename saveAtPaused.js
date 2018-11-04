var player = 		document.getElementById("player");
var leftcontrols =  document.getElementsByClassName("ytp-left-controls");
var rightcontrols = document.getElementsByClassName("ytp-right-controls");
var current =   	document.getElementsByClassName("ytp-time-current");
var duration =   	document.getElementsByClassName("ytp-time-duration");

var timestamp = current[0].innerText;

function convertTime2Secs(str){
	var timehours = /^\d+:\d+:\d+$/.exec(str);
	var timemins = /^\d+:\d+$/.exec(str);

	var hour; if(timehours != null) hour = parseInt(/^\d+(?=:)/.exec(timehours[0])[0]);
	var mins; if(timehours != null) mins = parseInt(/(?<=\d+:)\d+(?=:)/.exec(timehours[0])[0]);
	var secs; if(timehours != null) secs = parseInt(/\d+$/.exec(timehours[0])[0]);

	var hour; if(timehours == null) hour = 0;
	var mins; if(timemins != null) mins = parseInt(/^\d+(?=:)/.exec(timemins[0])[0]);
	var secs; if(timemins != null) secs = parseInt(/\d+$/.exec(timemins[0])[0]);

	return ((hour*(60*60))+(mins*60)+(secs));
}

var startFrom = '?t='+convertTime2Secs(timestamp);
var vidId = /(?<=watch\?v=)\w+/.exec(window.location.href)[0];

var webAppUrl = "";
var output = webAppUrl+startFrom+vidId;

console.log(output); 


