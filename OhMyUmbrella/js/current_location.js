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
function CurrentLocationUpdate() {
	var c_target1 = document.getElementById("c_area1");
	var c_target2 = document.getElementById("c_area2");
	var c_selected_do = c_target1.options[c_target1.selectedIndex].text;
	var c_selected_sigungu = c_target2.options[c_target2.selectedIndex].text;
	// alert(selected_value1 + ' : ' + selected_value2);
	
	localStorage.setItem("c_SEL_DO",c_selected_do);
	localStorage.setItem("c_SEL_SIGUNGU",c_selected_sigungu);
       
    history.back();   
}

