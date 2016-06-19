document.addEventListener('DOMContentLoaded', function() {
  
  addAllTabsToDOM();

  function addAllTabsToDOM(){
      // add all the tabs to the list
      chrome.tabs.getAllInWindow(null, function(tabs) {
          var clickOnInnerIcon = false;
          var selectValue = $( "select" ).val();

          if(selectValue == "Sites"){
            tabs.sort(sortByIcon);
          }else if (selectValue == "Audio"){
            tabs = sortByAudio(tabs);
          }

          for (i = 0; i < tabs.length; i++) {

              // 1. row left icon
              var eImg_leftIcon = createHtmlElement("Img", [{ key: "src", value: tabs[i].favIconUrl }, { key: "style", value: "width: 20px;" }]);
              var eDiv_leftIcon = createHtmlElement("Div", [{ key: "class", value: "col-xs-1" }]);
              eDiv_leftIcon.appendChild(eImg_leftIcon);

              // 2. row text
              var eDiv_middleText = createHtmlElement("Div", [{ key: "class", value: "col-xs-9" }]);
              var s_title = arrangeTitle(tabs[i].title, tabs[i].index + 1);
              eDiv_middleText.appendChild(document.createTextNode(s_title));

              // 3.1 audio img
              var eBtn_audio;
              if (tabs[i].audible) {
                  var b_muted = tabs[i].mutedInfo.muted;
                  var eImg_audio = createHtmlElement("Img", [{ key: "src", value: b_muted?  "offsound.png" : "sound.png" }, { key: "style", value: "width: 20px; margin-right:10px" }, { key: "id", value: "audioIcon" }]);
                  muteOnClick(eImg_audio, tabs[i].id);
              }
              // 3.2 the close icon.
              var eImg_close = createHtmlElement("Img", [{ key: "src", value: "close.png" }, { key: "style", value: "width: 15px; margin-right:10px" }]);

              // 3. define right icon div
              var eDiv_rightIcons = createHtmlElement("Div", [{ key: "class", value: "col-xs-1.5" }, { key: "style", value: "text-align:right;" }, { key: "id", value: "rightIcons" }]);
              if(tabs[i].audible){
                eDiv_rightIcons.appendChild(eImg_audio);
              }

              eDiv_rightIcons.appendChild(eImg_close);

              //define row div
              var eDiv_row = createHtmlElement("Div", [{ key: "class", value: "row" }]);
              eDiv_row.appendChild(eDiv_leftIcon);
              eDiv_row.appendChild(eDiv_middleText);
              eDiv_row.appendChild(eDiv_rightIcons);

              //define the <button
              var eBtn_row;
              if (tabs[i].highlighted){
                  eBtn_row = createHtmlElement("Button", [{ key: "class", value: "list-group-item" }, { key: "style", value: "margin-top:2px; background-color:lightblue" }]);
              }else{
                  eBtn_row = createHtmlElement("Button", [{ key: "class", value: "list-group-item" }, { key: "style", value: "margin-top:2px;" }]);
              }
              eBtn_row.appendChild(eDiv_row);
              var eUl_openTabs = document.getElementById("openTabs");

              addBtnListener(eUl_openTabs ,eBtn_row ,tabs[i].index, tabs[i].id, tabs[i].highlighted);
              closeOnClick(eUl_openTabs, eBtn_row, eImg_close ,tabs[i].id);

              eUl_openTabs.appendChild(eBtn_row);
          } //close for-loop

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
                      imgTag.setAttribute("src", tab.mutedInfo.muted ? "Sound.png" : "offSound.png");
                      chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
                  });
              }, false);
          };

          //on click hightlight tab
          function addBtnListener(parentTag ,btn, index, tabId, highlighted) {
              btn.addEventListener('click', function() {
                  chrome.tabs.highlight({ 'tabs': tabIndex }, function() {});
              }, false);
              btn.addEventListener('keydown', function(e){
                if(e.keyCode==46){
                  chrome.tabs.remove(tabId);
                  parentTag.removeChild(btn);
                }
              }, false);
              btn.addEventListener('focus', function(){
                if(!highlighted)
                  btn.setAttribute("style", "margin-top:2px; background-color:lightgreen");
              }, false);
              btn.addEventListener('focusout', function(){
                if(!highlighted)
                  btn.setAttribute("style", "margin-top:2px;");
              }, false);

          };

          //arrange title (remove long strings)
          function arrangeTitle(s_title, tabLocation) {
              var result = "";
              var sArr_words = s_title.split(" ");
              for (var i = 0; i < sArr_words.length; i++) {
                  if (sArr_words[i].length > 40) {
                      result = result + " " + sArr_words[i].substring(0, 40) + "...";
                  } else {
                      result = result + " " + sArr_words[i];
                  }
              }

              return result + " (" + tabLocation + ")";
          };

      }); // close chrome.tabs.getAllInWindow
  }// close addAllTabsToDOM

    // create html element function
    function createHtmlElement(elementName, propertyArr) {
        var newTagElement = document.createElement(elementName);
        for (var i = 0; i < propertyArr.length; i++) {
            newTagElement.setAttribute(propertyArr[i].key, propertyArr[i].value);
        }
        return newTagElement;
    };

    function sortByAudio(tabs) {
        var sortTabs = new Array(tabs.length)
        var start = 0;
        var end = tabs.length-1;
        for(var i=0; i< tabs.length; i++){
          if(tabs[i].audible){
            sortTabs[start] = tabs[i];
            start++;
          }else{
            sortTabs[end] = tabs[i];
            end--;
          }
        }//end for loop
        return sortTabs;
    };

    //sort by icon url (string)
    function sortByIcon(tab1, tab2){
      var s_icon1 = tab1.favIconUrl;
      var s_icon2 = tab2.favIconUrl;

      if(s_icon1 == undefined)
        s_icon1='z';
      if(s_icon2 == undefined)
          s_icon2='z';

      var result = s_icon1.localeCompare(s_icon2);
      if(result == 0 ){
        var s_title1 = tab1.title;
        var s_title2 = tab2.title;
        result = s_title1.localeCompare(s_title2);
      }
      return result;
    }

    //sort by icon url (string)
    function sortByIcon(tab1, tab2){
      var s_icon1 = tab1.favIconUrl;
      var s_icon2 = tab2.favIconUrl;

      if(s_icon1 == undefined)
        s_icon1='z';
      if(s_icon2 == undefined)
          s_icon2='z';

      var result = s_icon1.localeCompare(s_icon2);
      if(result == 0 ){
        var s_title1 = tab1.title;
        var s_title2 = tab2.title;
        result = s_title1.localeCompare(s_title2);
      }
      return result;
    }

    //search input
    $(function() {
        $('#input-search').on('keyup', function(e) {
            if (e.keyCode == 27) {
                $(this).blur();
            }

            var rex = new RegExp($(this).val(), 'i');
            $('.list-group .list-group-item').hide();

            $('.list-group .list-group-item').filter(function() {
                return rex.test($(this).text());
            }).show();

        });
    });

    // select sort.
    $("select").change(function() {
        var str = "";
        $('.list-group .list-group-item').each(function() {
            $(this).remove();
        });
        addAllTabsToDOM();
    });
}, false);
