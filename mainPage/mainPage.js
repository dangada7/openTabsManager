document.addEventListener('DOMContentLoaded', function() {

  // window.onblur = function(){
  //   window.close();
  // };

  document.body.onkeydown = function(e) {
      if (e.keyCode == 27)
          window.close();
  }

  sortAndsetTabs();

  //listenerLib
  addMyEventsListener();

}, false);

function sortAndsetTabs(){
  //add all the tabs
  chrome.windows.getAll({populate: true}, function(windows) {

      // for(var i=0; i < windows.length; i++)
        // windows[0].tabs = sortTabs(windows[i].tabs);

      resetTabsList(windows[0].tabs);

  }); // close chrome.tabs.getAllInWindow
}

// select sort.
$(function() {
  $("select").change(function() {
      var str = "";
      $('.list-group .list-group-item').each(function() {
          $(this).remove();
      });
      $('.list-group #winTitle').each(function() {
          $(this).remove();
      });

      sortAndsetTabs();
  });
});

//search input
$(function() {
    $('#input-search').on('keyup', function(e) {
        //click on Esc
        if (e.keyCode == 27) {
            $(this).blur();
        }

        var rex = new RegExp($(this).val(), 'i');
        $('.list-group .tab').hide();

        $('.list-group .tab').filter(function() {
            return rex.test($(this).text());
        }).show();
    });
});
