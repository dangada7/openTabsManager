document.addEventListener('DOMContentLoaded', function() {

    var i_OpenTabsManagerWid = parseInt(localStorage.getItem("openTabsManagerWid"));

    if(isNaN(i_OpenTabsManagerWid)){
      i_OpenTabsManagerWid = -1;
    }

    chrome.windows.get(i_OpenTabsManagerWid, {}, function(window) {
        if (window == undefined) {
            var h = screen.height;
            var w = screen.width;
            chrome.windows.create({
                url : "mainPage/mainPage.html",
                height : h,
                width : Math.round(w / 3),
                left : Math.round(2 * w / 3),
                type : "popup",
            }, function(mainPageWindow) {
                localStorage.setItem("openTabsManagerWid", mainPageWindow.id);
            });
        }else{
          chrome.windows.update(i_OpenTabsManagerWid,{focused:true});
        }
    });

}, false);
