//export all function
//
// function AddEventListener_eDiv_winTitle(eDiv_winTitle) {
//     eDiv_winTitle.addEventListener('click', function() {
//
//         var winTitle = prompt("Please enter new window name", eDiv_winTitle.innerHTML);
//         if (winTitle != "" && winTitle != null) {
//           eDiv_winTitle.innerHTML = winTitle;
//         }
//     });
// };

// function winTitleAddEventListener(tn_windowTitle){
//   tn_windowTitle.addEventListener('DOMCharacterDataModified', function() {
//
//   }, false);
// }
// ============================================================
// on click close tab
// ============================================================
function closeOnClick(parentTag, childTag, imgTag, tabId) {
    imgTag.addEventListener('click', function() {
        event.stopPropagation();
        chrome.tabs.remove(tabId);
        parentTag.removeChild(childTag);
        // clickOnInnerIcon = true;
    }, false);
};

// ============================================================
// on click mute tab
// ============================================================
function muteOnClick(imgTag, tabId) {
    imgTag.addEventListener('click', function() {
        event.stopPropagation();
        chrome.tabs.get(tabId, function (tab){
            imgTag.setAttribute("src", tab.mutedInfo.muted ? "../images/Sound.png" : "../images/noSound.png");
            chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
        });
    }, false);
};
// ============================================================
// on click list object (tab)
// ============================================================
function listener_listObject(eDiv_parent , eBtn_listObject, tab) {

    // eBtn_listObject.addEventListener('contextmenu', function(e){
    //     console.log("left mouse click");
    //     e.stopPropagation();
    //

    //(1) buttons
    eBtn_listObject.addEventListener('keydown', function(e){

      if(e.keyCode == gp_keys.t){
        var s_tag = prompt("Enter new tag:");
        if (s_tag != null && s_tag != "") {

          window.localStorage.setItem(tab.url, s_tag);
          resetTabsList();
        }
      }

      if(e.keyCode == gp_keys.delete){
        chrome.tabs.remove(tab.id);
        eDiv_parent.removeChild(eBtn_listObject);
      }

      if(e.keyCode == gp_keys.enter){
          var winId = parseInt(window.localStorage.getItem(gp_localStorageKeys.openTabsManagerWinId));
          chrome.windows.update(winId,{ state : "minimized"});
      }

    }, false);

    // (2) focus
    eBtn_listObject.addEventListener('focus', function(){
      var i_backGroundWindowId = parseInt(localStorage.getItem("backGroundWindowId"));
      var i_openTabsManagerWid = parseInt(localStorage.getItem("openTabsManagerWid"));

      if(i_backGroundWindowId != tab.windowId){
          localStorage.setItem("backGroundWindowId",tab.windowId);
          chrome.windows.update(tab.windowId, {focused : true}, function(){});
          chrome.windows.update(i_openTabsManagerWid, {focused : true}, function(){});
      }
      chrome.tabs.get(tab.id, function(tab){
        chrome.tabs.highlight({"windowId":tab.windowId ,'tabs': tab.index });
      });

        if(tab.highlighted){
          eBtn_listObject.setAttribute("style", "margin-top:2px; background-color:" + gp_color.yellow);
        }else {
          eBtn_listObject.setAttribute("style", "margin-top:2px; background-color:" + gp_color.green);
        }
    }, false);

    // (3) focusout
    eBtn_listObject.addEventListener('focusout', function(){
      if(tab.highlighted){
        eBtn_listObject.setAttribute("style", "margin-top:2px; background-color:" + gp_color.blue);
      }else{
        eBtn_listObject.setAttribute("style", "margin-top:2px;");
      }
    }, false);

};

// ============================================================
// ============================================================
function addMyEventsListener() {
    document.getElementById("dropdownMenu2").addEventListener("focus", function() {
        this.setAttribute("style", "background-color:" + gp_color.green);
    });

    document.getElementById("dropdownMenu2").addEventListener("focusout", function() {
        this.setAttribute("style", "");
    });


    $("#myTags").click(function(){
      addTagsList()
    });

}
