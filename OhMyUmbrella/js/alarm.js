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
		
		
		/* 알람 on 됐으니 재설정 */
		var hour = localStorage.getItem('HOUR');
		var minute = localStorage.getItem('MINUTE');
		
		add_alarm(hour, minute);
	}
	
	else{
		onoff.innerText = "알림 off";
		
		var alarms = tizen.alarm.getAll();
		tizen.alarm.removeAll(); // 설정된 알람 모두 삭제
	}
		
}


function set_time(element){
	
	/* 설정한 시각으로 텍스트를 바꾸는 부분 */
	var set_time = document.getElementById("time").value;
	localStorage.setItem("set_time",set_time);
	var element = document.getElementById("now_set_time");
	element.innerText = set_time;
	
	/* 알람설정 부분 */
	if (set_time) { 
 		var time = set_time.split(':');
 	 	var hour = time[0];
 	 	var minute = time[1];
 	 	
 	 	hour = parseInt(hour);
 	 	minute = parseInt(minute);
 	 	localStorage.setItem("HOUR", hour);
 	 	localStorage.setItem("MINUTE", minute);
 		console.log("hour",hour);
 		console.log("minute",minute);
		add_alarm(hour, minute);
 	 	
 	}
		
}


function add_alarm(hour, minute){
	tizen.alarm.removeAll(); // 설정된 알람 모두 삭제
	
	
	var now = new Date();
	var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
	var alarm = new tizen.AlarmAbsolute(date, ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]); // date 시각에 첫 알람이 시작해서 매일 반복
	console.log(date);

	var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
	tizen.alarm.add(alarm, tizen.application.getCurrentApplication().appInfo.id, appControl);
	
	
	
	/*
	var notificationGroupDict =
	{
	  content: "오늘은 비가 오니 우산을 챙겨가세요!",
	  actions: {soundPath: "music/Over the horizon.mp3", vibration: true}
	};
	
	var notification = new tizen.UserNotification("SIMPLE", "오늘의 우산", notificationGroupDict);
	
	tizen.alarm.addAlarmNotification(alarm, notification);
	*/

	
}