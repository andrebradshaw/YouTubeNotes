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
