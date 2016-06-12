document.addEventListener('DOMContentLoaded', function() {

  // // button ope tabs manager
  // var checkPageButton = document.getElementById('checkPage');
  // checkPageButton.addEventListener('click', function() {
  //     chrome.tabs.create({url : 'openTabsManager.html'});
  // }, false);


  // add all the tabs to the list
  chrome.tabs.getAllInWindow(null, function(tabs) {
      for (i = 0; i < tabs.length; i++) {
          var btn = document.createElement("BUTTON");
          btn.appendChild(document.createTextNode(tabs[i].title));
          btn.setAttribute("class", "list-group-item");

          listenerForI(btn, tabs[i].index);

          document.getElementById("openTabs").appendChild(btn);
      }

      function listenerForI(btn, tabIndex) {
          btn.addEventListener('click', function() {
              // alert(id);
              chrome.tabs.highlight({
                  'tabs': tabIndex
              }, function() {});
          }, false);
      }
  });

  // set the search functionality
  $(function() {
      $('#input-search').on('keyup', function() {
        var rex = new RegExp($(this).val(), 'i');
          $('.list-group .list-group-item').hide();
          $('.list-group .list-group-item').filter(function() {
              return rex.test($(this).text());
          }).show();
      });
  });

}, false);
