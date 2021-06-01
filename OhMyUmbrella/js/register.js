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




function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

var data = [];
var adapter = tizen.bluetooth.getLEAdapter();
var n = [];
var address = [];

adapter.startScan(function onsuccess(device)
{

	console.log("Found device - name: " + device.name + ", Address: " + device.address);
	
	if (typeof(device.name)=="string") {
		var tmp = [device.name, device.address];
	}
	else {
		var tmp = ["?????", device.address];
	}
	
	
	data.push(tmp);
	
	if (data.length == 7) {
		adapter.stopScan();
		
		var set = multiDimensionalUnique(data);
		
		$(document).ready(function() {
		    var $listTbody = $(".list tbody");
		    set.forEach(function(val) {
		        $listTbody.append("<tr onclick='OK(\""+ val[0] +"\", \"" + val[1] + "\")'><td>" + val[0] + "</td><td>" + val[1] + "</td></tr>");
		    });
		});
		
	}
	
});



function OK(name, address){
	var r = confirm(name + ' [' + address + ']\n' + '연결하시겠습니까?');
	if (r==true)
	{
		//func(name, address);
		
		///* native app 실행부 *///
	      var appControlReplyCallback = {
					// callee sent a reply
					onsuccess: function(data) {

						console.log('reply : ', data[0].value[0]);

					},
					// callee returned failure
					onfailure: function() {
						console.log('The launch application control failed');
					}
			}

	      
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
					appControlReplyCallback);
			
			alert('연결에 성공했습니다');
			localStorage.setItem("NAME", name );
			localStorage.setItem("ADDRESS", address);
			localStorage.setItem("UMBRELLA", name);
	    	localStorage.setItem("connectStatus", "연결됨");
	}
	
}



var watchId;

function func(name, address) {
	
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
			        });
			      
			      
			      alert('연결에 성공했습니다');
			      
			      
			      
			      
			      
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
	    alert('등록에 실패했습니다. : ' + e.message);
	}

	function connectSuccess() {
		localStorage.setItem("NAME", name );
		localStorage.setItem("ADDRESS", address);
		console.log('Connected to device');
	}
	
	
	
	alert('등록 중........');
	
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
	
	adapter.startScan(onsuccess);
	
}
	
