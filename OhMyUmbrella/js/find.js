
function find(){
	console.log("in find function");
	var address = localStorage.getItem("ADDRESS");
	
	var obj = new tizen.ApplicationControlData("M0r5iHmiP1.OhMyUmbrella", [address,"find"]);

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
	

}


function a(device){
	try{
	    var serviceUUID = device.getService(device.uuids[0]);
		var property = serviceUUID.characteristics[1];
	      
	      if (!property.isWritable) {
	          alert('Property seems not to be writable. Attempting to write...');
	      }
	      
	      console.log('send Value');
	      var newValue = [1];

	      property.writeValue(newValue, function()
	        {
	    	  console.log("Value written");
	          //device.disconnect();
	        },
	        function(e)
	        {
	      	  alert("Failed to write: " + e.message);
	        });
	    } catch (e) {
	    	console.log(e.message);
	    	}
}


function le(){
	var connectionListener = {
		    onconnected: function(device) {
		    	try{
				    var serviceUUID = device.getService(device.uuids[0]);
					var property = serviceUUID.characteristics[1];
				      
				      if (!property.isWritable) {
				          alert('Property seems not to be writable. Attempting to write...');
				      }
				      
				      console.log('send Value');
				      var newValue = [1];

				      property.writeValue(newValue, function()
				        {
				    	  console.log("Value written");
				          //device.disconnect();
				        },
				        function(e)
				        {
				      	  alert("Failed to write: " + e.message);
				        });
				    } catch (e) {
				    	console.log(e.message);
				    	}
		    },
		    ondisconnected: function(device) {
		    	
		    	console.log('Disconnected from the device ' + device.name + ' [' + device.address + ']');
		    }
		};
	function connectFail(e) {
	}

	function connectSuccess() {
		
	}
	var adapter = tizen.bluetooth.getLEAdapter();
	adapter.startScan(function onsuccess(device)
	{
		
		if (device.address == "5C:16:2F:6D:BF:FC")
		{
		
			
	    console.log("Found device: " + device.name);
	    adapter.stopScan();
	    
	    
	    device.connect(connectSuccess, connectFail); //connect
	    watchId = device.addConnectStateChangeListener(connectionListener);
	   
	    

	     
	  }
	});
}