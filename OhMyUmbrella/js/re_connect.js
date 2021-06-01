



function re_connect() {
	var address = localStorage.getItem("ADDRESS");
	
	
	
	var obj = new tizen.ApplicationControlData("M0r5iHmiP1.OhMyUmbrella", [address,"address"]);

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
	
	alert('재연결에 성공했습니다');
	var name = localStorage.getItem("NAME");
	localStorage.setItem("UMBRELLA", name);
	localStorage.setItem("connectStatus", "연결됨");
	
	
	
	/*
	var adapter = tizen.bluetooth.getLEAdapter();
	
	var connectionListener = {
		    onconnected: function(device) {
		    	
		    	
		    	localStorage.setItem("UMBRELLA", device.name);
		    	localStorage.setItem("connectStatus", "연결됨");
		    	
		    	var serviceUUID = device.getService(device.uuids[0]);
				var property = serviceUUID.characteristics[0];
			      

			      property.readValue(function(val)
			    	      {
			          console.log("Value read: " + val);
			          localStorage.setItem("BATTERY", val);
			          //device.disconnect();
			        });
			      
			     
		    },
		    ondisconnected: function(device) {
		    	var bat = localStorage.getItem("BATTERY");
		    	
		    	if (parseInt(bat)>5) {
		    		localStorage.setItem("UMBRELLA", "우산 잃어버림");
				}
		    	else {
		    		localStorage.setItem("UMBRELLA", "배터리 없음");
				}
		    	
		    	
		    	localStorage.setItem("connectStatus", "연결안됨");
		    	
		    	var notificationGroupDict =
		    	{
		    	  content: "우산과의 연결이 끊어졌습니다!",
		    	  actions: {soundPath: "music/Over the horizon.mp3", vibration: true}
		    	};

		    	var notification = new tizen.UserNotification('SIMPLE', '우산 연결 끊어짐', notificationGroupDict);
		    	tizen.notification.post(notification);
		    	
		    	console.log('Disconnected from the device ' + device.name + ' [' + device.address + ']');
		    }
		};

	function connectFail(e) {
	    alert('우산과 연결에 실패했습니다. 다시 시도해주세요.');
	}

	function connectSuccess() {
		localStorage.setItem("ADDRESS", address);
		alert("재연결에 성공했습니다.");
		//window.location.reload();
	}
	
	function onsuccess(device)
	{
		if (device.address == address)
	  {
	    console.log("Found device: " + device.name);
	    adapter.stopScan();
	    
	    watchId = device.addConnectStateChangeListener(connectionListener);
	    
	    device.connect(connectSuccess, connectFail); //connect
	  }
	}
	
	adapter.startScan(onsuccess);*/
	
}
