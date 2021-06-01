
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

	var address = localStorage.getItem("ADDRESS");
	
/*	var appControlReplyCallback = {
			// callee sent a reply
			onsuccess: function(data) {
				console.log(data);
				localStorage.setItem("UMBRELLA", "내 우산");
		    	localStorage.setItem("connectStatus", "연결됨");

			},
			// callee returned failure
			onfailure: function() {
				alert('The launch application control failed');
			}
	}
	*/
	var obj = new tizen.ApplicationControlData("M0r5iHmiP1.OhMyUmbrella", [address, "delete"]);

	var obj1 = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/service",
			null,
			null,
			null,
			[obj] 
	);

	tizen.application.launchAppControl(obj1,
			"M0r5iHmiP1.servicebluetooth",
			function() {console.log("Launch Service succeeded"); },
			function(e) {console.log("Launch Service failed : " + e.message);},
			null);
	
	localStorage.setItem("NAME", "" );
	localStorage.setItem("ADDRESS", "");
	localStorage.setItem("UMBRELLA", "내 우산");
	localStorage.setItem("connectStatus", "연결안됨");
	window.location.reload();
	
}