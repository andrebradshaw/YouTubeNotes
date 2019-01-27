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


fetch(/*yourstuff*/)
.then(res=>{return res.json()})
.then(jdat=>{
	var transScriptArray = jdat.data.actions[0].openTranscriptAction.transcriptRenderer.transcriptRenderer.body.transcriptBodyRenderer.cueGroups;
//transcriptCueGroupRenderer
	for(t=0; t<transScriptArray.length; t++){
		var text = transScriptArray[t].transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.cue.simpleText;
		var time = convertTime2Secs(transScriptArray[t].transcriptCueGroupRenderer.formattedStartOffset.simpleText)
		console.log([time,text])
    }
})
