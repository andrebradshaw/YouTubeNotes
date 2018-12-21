
function clickMenu(){
	document.getElementById('menu-container').getElementsByTagName('ytd-menu-renderer')[0].getElementsByTagName('yt-icon')[4].click()
}

function clickTrans(){
	setTimeout(()=>{
		document.getElementsByTagName('paper-listbox')[1].getElementsByTagName('ytd-menu-service-item-renderer')[1].click();
	},1600);
}

function getTrans(){
	setTimeout(()=>{
		document.getElementById('transcript').getElementsByClassName('cue-group style-scope ytd-transcript-body-renderer').length;
    },2400);
}

var first = new Promise(res=>{res(clickMenu())});

first.then(clickTrans()).then(getTrans())

/*
function openTranscript(){
	function c1(){
		setTimeout(() =>{
			var info = document.getElementById("info").getElementsByClassName("dropdown-trigger style-scope ytd-menu-renderer")[0];
			info.click();
		},666);
    }
	var c = new Promise(res =>{ res(c1()); });
	
	c.then(document.getElementsByClassName("style-scope ytd-menu-popup-renderer")[2].click());	
}
*/
