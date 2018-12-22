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

var transList = document.getElementById('transcript').getElementsByClassName('cue-group style-scope ytd-transcript-body-renderer');

var transArr = [];
for(i=0; i<transList.length; i++){
	var time = transList[i].getElementsByClassName('cue-group-start-offset style-scope ytd-transcript-body-renderer')[0].innerText;
	var txt = transList[i].getElementsByClassName('cues style-scope ytd-transcript-body-renderer')[0].innerText;
	transArr.push([time,txt])
}

var wordCount = transArr.map(itm=>{
	return itm[1].match(/\w+/g).length
});

var textBody = '';
transArr.forEach(itm=>{
	textBody = textBody + itm[1] +' {'+itm[0]+'} ';
});

textBody

//American.{0,50}?corporation.+?\{(.+?)\}
