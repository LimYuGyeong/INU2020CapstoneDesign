/* 워치의 뒤로가기 버튼 활성화하는 함수 */
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

// location 페이지의 "목적지:도,시/군/구"를 선택한 목적지로 갱신하는 함수
function DestinationUpdate() {
	var target1 = document.getElementById("area1");
	var target2 = document.getElementById("area2");
	var selected_do = target1.options[target1.selectedIndex].text;
	var selected_sigungu = target2.options[target2.selectedIndex].text;
	// alert(selected_value1 + ' : ' + selected_value2);
	
	localStorage.setItem("SEL_DO",selected_do);
	localStorage.setItem("SEL_SIGUNGU",selected_sigungu);
       
    history.back();   
}

