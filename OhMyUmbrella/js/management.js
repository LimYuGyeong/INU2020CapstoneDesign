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

function register() {
	var adapter = tizen.bluetooth.getLEAdapter();
	adapter.startScan(function onsuccess(device)
	{
	  console.log("Found device - name: " + device.name + ", Address: " + device.address);
	});
	
}
function register2() {
	var adapter = tizen.bluetooth.getDefaultAdapter();

	/* Purpose of code below is to enable Bluetooth on the device. */

	var bluetoothSwitchAppControl = new tizen.ApplicationControl(
	    "http://tizen.org/appcontrol/operation/edit", null, "application/x-bluetooth-on-off");
	function launchSuccess()
	{
	  console.log("Bluetooth Settings application is successfully launched");
	}
	function launchError(error)
	{
	  alert("An error occurred: " + error.name +
	        ". Please enable Bluetooth through the Settings application");
	}
	var serviceReply =
	{
	  /* Called when the launched application reports success. */
	  onsuccess: function(data)
	  {
	    if (adapter.powered)
	    {
	      console.log("Bluetooth is successfully turned on");
	      startDiscovery();
	    }
	    else
	    {
	      console.log("Bluetooth is still switched off");
	    }
	  },
	  /* Called when launched application reports failure. */
	  onfailure: function()
	  {
	    alert("Bluetooth Settings application reported failure");
	  }
	};
	/* Discovery sample code. */

	function startDiscovery()
	{
	  var discoverDevicesSuccessCallback =
	  {
	    onstarted: function()
	    {
	      console.log("Device discovery started");
	    },
	    ondevicefound: function(device)
	    {
	      console.log("Found device - name: " + device.name + ", Address: " + device.address);
	    },
	    ondevicedisappeared: function(address)
	    {
	      console.log("Device disappeared: " + address);
	    },
	    onfinished: function(devices)
	    {
	      console.log("Found Devices");
	      for (var i = 0; i < devices.length; i++)
	      {
	        console.log("Name: " + devices[i].name + ", Address: " + devices[i].address);
	      }
	      console.log("Total: " + devices.length);
	    }
	  };

	  /* Starts searching for nearby devices, for about 12 sec. */
	  adapter.discoverDevices(discoverDevicesSuccessCallback, function(e)
	  {
	    console.log("Failed to search devices: " + e.message + "(" + e.name + ")");
	  });
	}

	/* Execution. */

	if (adapter.powered)
	{
	  console.log("Bluetooth is already enabled");
	  startDiscovery();
	}
	else
	{
	  console.log("Try to launch the Bluetooth Settings application");
	  tizen.application.launchAppControl(
	      bluetoothSwitchAppControl, null, launchSuccess, launchError, serviceReply);
	}
}