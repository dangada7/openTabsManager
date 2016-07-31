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
function listner_listObject(eDiv_parent , eBtn_listObject, tab) {

    // eBtn_listObject.addEventListener('contextmenu', function(e){
    //     console.log("left mouse click");
    //     e.stopPropagation();
    //
    // });

    //(1) buttons
    eBtn_listObject.addEventListener('keydown', function(e){

      if(e.keyCode == gp_keys.t){
        var s_tag = prompt("Enter new tag:");
        if (s_tag != null && s_tag != "") {
          window.localStorage.setItem(tab.url, s_tag);
        }
      }

      if(e.keyCode == gp_keys.delete){
        chrome.tabs.remove(tab.id);
        eDiv_parent.removeChild(eBtn_listObject);
      }
    }, false);

    //(2) focus
    eBtn_listObject.addEventListener('focus', function(){
      var i_backGroundWindowId = parseInt(localStorage.getItem("backGroundWindowId"));
      var i_openTabsManagerWid = parseInt(localStorage.getItem("openTabsManagerWid"));

      if(i_backGroundWindowId != tab.windowId){
          localStorage.setItem("backGroundWindowId",tab.windowId);
          chrome.windows.update(windowId, {focused : true}, function(){});
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
    document.getElementById("filterBtn").addEventListener("focus", function() {
        this.setAttribute("style", "background-color:" + gp_color.green);
    });

    document.getElementById("filterBtn").addEventListener("focusout", function() {
        this.setAttribute("style", "");
    });


    $("#myTags").click(function(){
      addTagsList()
    });

}

// ============================================================
// ============================================================
function addTagsList(){

    var arr_tabsWithTags = getTabsWithTags()

    var div = document.getElementById('myTagsModalBody');
    div.innerHTML = ""
    for(i=0; i< arr_tabsWithTags.length; i++){
        var eP_test   = createHtmlElement("p", null);
        eP_test.innerHTML = arr_tabsWithTags[i].tagName;
        div.appendChild(eP_test);
        for(j=0; j< arr_tabsWithTags[i].arr_tabs.length; j++){
          eP_test   = createHtmlElement("p", null);
          eP_test.innerHTML = "===" + arr_tabsWithTags[i].arr_tabs[j];
          div.appendChild(eP_test);
        }//close for
    }//close for
}


// ============================================================
// ============================================================
function getTabsWithTags(){

  var arr_tabsWithTags = [];
  var urlKey, i = 0, j;
  while(urlKey = window.localStorage.key(i)){
    i++;
    var tagName = window.localStorage.getItem(urlKey)
    console.log(tagName + "=" + urlKey);
    for(j=0 ; j< arr_tabsWithTags.length; j++){
      if(arr_tabsWithTags[j].tagName == tagName){
        arr_tabsWithTags[j].arr_tabs.push(urlKey);
        break;
      }
    }//close for
    if (j == arr_tabsWithTags.length){
      var obj_tabWithTag = {tagName: tagName, arr_tabs:[urlKey]}
      arr_tabsWithTags.push(obj_tabWithTag);
    }
  }//close for

  return arr_tabsWithTags;
}
