// 워치의 뒤로가기 버튼 활성화하는 함수
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

function init(){
	var res = localStorage.getItem("RESULT")
	if(res) {
		var element = document.getElementById("txt_destination");
		element.innerText = res;
		
	}
	}
