//
// chrome.windows.onFocusChanged.addListener(function(windowId) {
//
//     var i_OpenTabsManagerWid = parseInt(localStorage.getItem(gp_localStorageKeys.openTabsManagerWinId));
//
//     console.log(i_OpenTabsManagerWid)
//     //open tabs manager was open
//     if(! isNaN(i_OpenTabsManagerWid)){
//       chrome.windows.getLastFocused({}, function(window) {
//           if(window.id != i_OpenTabsManagerWid){
//             chrome.windows.remove(i_OpenTabsManagerWid);
//             localStorage.removeItem(gp_localStorageKeys.openTabsManagerWinId);
//           }
//       });
//     }
//
// });
