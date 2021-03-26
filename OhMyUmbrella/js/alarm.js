(function () {
   window.addEventListener("tizenhwkey", function (ev) {
      var activePopup = null,
         page = null,
         pageId = "";

      if (ev.keyName === "back") {
         activePopup = document.querySelector(".ui-popup-active");
         page = document.getElementsByClassName("ui-page-active")[0];
         pageId = page ? page.id : "";

         if (pageId === "main" && !activePopup) {
            try {
               tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
            }
         } else {
            window.history.back();
         }
      }
   });
}());



function toggle(element){
	var onoff = document.getElementById("onoff")
	if (onoff.innerText == "알림 off"){
		onoff.innerText = "알림 on";
	}
	else{
		onoff.innerText = "알림 off";
	}
		
}


function set_time(element){
	
	var set_time = document.getElementById("time").value;
	localStorage.setItem("set_time",set_time);
	var element = document.getElementById("now_set_time");
	element.innerText = set_time;
}
