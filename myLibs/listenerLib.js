//export all function


// on click close tab
function closeOnClick(parentTag, childTag, imgTag, tabId) {
    imgTag.addEventListener('click', function() {
        event.stopPropagation();
        chrome.tabs.remove(tabId);
        parentTag.removeChild(childTag);
        // clickOnInnerIcon = true;
    }, false);
};

// on click mute tab
function muteOnClick(imgTag, tabId) {
    imgTag.addEventListener('click', function() {
        event.stopPropagation();
        chrome.tabs.get(tabId, function (tab){
            imgTag.setAttribute("src", tab.mutedInfo.muted ? "../images/Sound.png" : "../images/noSound.png");
            chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
        });
    }, false);
};

//on click hightlight tab
function addBtnListener(parentTag ,btn, tabIndex, tabId, highlighted, windowId) {

    btn.addEventListener('click', function() {
        chrome.tabs.highlight({"windowId":windowId ,'tabs': tabIndex }, function() {});
    }, false);
    btn.addEventListener('keydown', function(e){

      //13 == enter button
      if(e.keyCode==13){
        window.close();
      }

      //46 == delete button
      if(e.keyCode==46){
        chrome.tabs.remove(tabId);
        parentTag.removeChild(btn);
      }
    }, false);

    btn.addEventListener('focus', function(){
      var i_backGroundWindowId = parseInt(localStorage.getItem("backGroundWindowId"));
      var i_openTabsManagerWid = parseInt(localStorage.getItem("openTabsManagerWid"));

      if(i_backGroundWindowId != windowId){
          localStorage.setItem("backGroundWindowId",windowId);
          chrome.windows.update(windowId, {focused : true}, function(){});
          chrome.windows.update(i_openTabsManagerWid, {focused : true}, function(){});
      }
        chrome.tabs.highlight({"windowId":windowId ,'tabs': tabIndex }, function() {});
        if(highlighted){
          btn.setAttribute("style", "margin-top:2px; background-color:" + S_color.yellow);
        }else {
          btn.setAttribute("style", "margin-top:2px; background-color:" + S_color.green);
        }
    }, false);

    btn.addEventListener('focusout', function(){
      if(highlighted){
        btn.setAttribute("style", "margin-top:2px; background-color:" + S_color.blue);
      }else{
        btn.setAttribute("style", "margin-top:2px;");
      }
    }, false);

};

function addMyEventsListener() {
    document.getElementById("filterBtn").addEventListener("focus", function() {
        this.setAttribute("style", "background-color:" + S_color.green);
    });

    document.getElementById("filterBtn").addEventListener("focusout", function() {
        this.setAttribute("style", "");
    });


    document.getElementById("helpBtn").addEventListener("focus", function() {
        this.setAttribute("style", "margin-left:10px; background-color:" + S_color.green);
    });

    document.getElementById("helpBtn").addEventListener("focusout", function() {
        this.setAttribute("style", "margin-left:10px");
    });
}
