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


/*
var timerID;
$(document).ready(function () {

        //e.preventDefault();
        updateData();
    $('#stop').on('click',function(e){
        e.preventDefault();
       clearTimeout(timerID); // 타이머 중지
        //$('#showtime').html('');
    });
});

function updateData(){
    $.ajax({
      url: "getserver.php",
      type:"post",
      cache : false,
      success: function(data){ // getserver.php 파일에서 echo 결과값이 data 임
       $('#showtime').html(data);
      }
    });
    timerID = setTimeout("updateData()", 1000); // 2초 단위로 갱신 처리
}
*/


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
		func(name, address);
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
			      
			      
			      //alert('Connected to the device: ' + device.name + ' [' + device.address + ']');
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
	
