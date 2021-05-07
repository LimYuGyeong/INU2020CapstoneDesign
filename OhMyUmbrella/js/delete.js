
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


var n = localStorage.getItem("NAME");
var address = localStorage.getItem("ADDRESS");

$(document).ready(function() {
    var $listTbody = $(".list tbody");
    $listTbody.append("<tr onclick='del()'><td>" + n + "</td><td>" + address + "</td></tr>");
});



function del() {
	var adapter = tizen.bluetooth.getLEAdapter();
	
	adapter.startScan(function onsuccess(device)
	{
		if (device.address == address)
	  {
	    console.log("Found device: " + device.name);
	    adapter.stopScan();
	    
	    device.disconnect();
	    
	  }
	});
	
	localStorage.setItem("NAME", "" );
	localStorage.setItem("ADDRESS", "");
	window.location.reload();
}