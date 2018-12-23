function createSearchPop(){
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
    createDiv.style.border = "1px solid DarkSlateGrey ";
    createDiv.style.background = "DarkSlateGrey";
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
      createModElm.style.width = "100%";
      createModElm.style.height = "32px";
      createModElm.style.padding = "6px";
      createModElm.style.border = "1px solid DarkSlateGrey";
      createModElm.style.background = "white";
      createModElm.style.borderRadius = "1em";

    var createbtn = document.createElement("button");
    document.getElementById("popup_win").appendChild(createbtn);
    createbtn.setAttribute("id", "btn_box");
    document.getElementById("btn_box").innerText = "Search";
    createbtn.style.background = "DarkCyan";
    createbtn.style.border = "1px solid DarkSlateGrey";
    createbtn.style.width = "100%";
    createbtn.style.height = "33px";
    createbtn.style.borderRadius = "1em";
    createbtn.style.color = "white";

	function close() {
  		document.body.removeChild(document.getElementById("popup_win"));
	}	
	function searchTrans(){
		var searchInput = document.getElementById('box_nearSearch').value;
		console.log(searchInput);

	}
	document.getElementById("btn_box").addEventListener("click", searchTrans);
	document.getElementById("btn_close").addEventListener("click", close);

}

createSearchPop()
