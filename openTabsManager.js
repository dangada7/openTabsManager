document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.getAllInWindow(null ,function(tabs){
    for (i = 0; i < tabs.length; i++) {
      var btn = document.createElement("BUTTON");
      btn.appendChild(document.createTextNode(tabs[i].title));
      btn.setAttribute("class","list-group-item");

      listenerForI(btn, tabs[i].index);

      document.getElementById("openTabs").appendChild(btn);
    }


    function listenerForI(btn, tabIndex ) {
      btn.addEventListener('click', function() {
        // alert(id);
        chrome.tabs.highlight({'tabs': tabIndex}, function(){});
      }, false);
    }
    // var txt = "";
    // var i;
    //
    // for (i = 0; i < tabs.length; i++) {
    //   //  txt = txt + "<a target=\"_blank\" href=" + tabs[i].url + ">";
    //     txt = txt + "<button type='button' class='list-group-item' id='mybutton'>";
    //     //txt = txt + "<div class='col-lg-1'>";
    //     //txt = txt + "<img src='" + tabs[i].favIconUrl + "' />";
    //     //txt = txt + "</div>";
    //     txt = txt + tabs[i].title;
    //     txt = txt + "</button'>";
    //     //txt = txt + "</a'>";
    //     // txt = txt + "<a target=\"_blank\" href=" + tabs[i].url + ">" + tabs[i].title + "</a>" + "<br>" ;
    //     // txt = txt + "<img src='" + tabs[i].favIconUrl + "' />"
    // }

    // document.getElementById("openTabs").innerHTML = txt;
  });

//  chrome.tabs.remove(null);

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
