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
	
	// 알람설정 부분 //
	if (set_time) {
 		var time = set_time.split(':');
 	 	var hour = time[0];
 	 	var minute = time[1];
 	 	
 	 	hour = parseInt(hour);
 	 	minute = parseInt(minute);
// 	 	console.log("hour : " , hour, typeof(hour))
// 		console.log("minute : " , minute, typeof(minute))
 		
 	 	var now = new Date();
 		
 		var notification = new tizen.UserNotification('SIMPLE', 'Simple notification', notificationGroupDict);
 		var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
 		var alarm = new tizen.AlarmAbsolute(date);

 		var notificationGroupDict =
 		{
 		  content: "오늘은 비가 오니 우산을 챙겨가세요!",
 		  actions: {soundPath: "music/Over the horizon.mp3", vibration: true}
 		};
 		
 		var notification = new tizen.UserNotification("SIMPLE", "오늘의 우산", notificationGroupDict);
 		
 		/* Adds an alarm. */
 		tizen.alarm.addAlarmNotification(alarm, notification);
 		
 		}
		
}
