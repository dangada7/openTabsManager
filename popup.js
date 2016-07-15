document.addEventListener('DOMContentLoaded', function() {

    chrome.windows.get(-1, {}, function(window) {
        var h = screen.height;
        var w = screen.width;

        chrome.windows.create({
            url: "mainPage/mainPage.html",
            height: h,
            width: Math.round(w / 3),
            left: Math.round(2 * w / 3),
            type: "popup",
        }, function(mainPageWindow) {
            localStorage.setItem("openTabsManagerWid", mainPageWindow.id);
        });
    });

}, false);
