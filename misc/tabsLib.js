//this lib export one function - resetTabsList
//use liseners

// ============================================================
// ============================================================
function resetTabsList() {
    var tabs = chrome.windows.getAll({populate: true}, function(windows) {
        resetTabsListWithTabs(windows[0].tabs);
    });
}

// ============================================================
// ============================================================
function resetTabsListWithTabs(tabs) {

    arr_tabsWithTags = arrangeTabsByTags(tabs);

    var eUl_openTabs = document.getElementById("openTabs");
    eUl_openTabs.innerHTML = "";
    eUl_openTabs.setAttribute("style", "margin-top: .3cm; overflow-y: scroll; height:" + (screen.height - 220) + "px;");

    var i, j;
    for(i=0 ; i<arr_tabsWithTags.length; i++){

      var eDiv_Window = createHtmlElement("div", [gp_attributes.liDividerStyle, {key:"id",value:"winTitle"}]);
      var tn_window   = document.createTextNode(arr_tabsWithTags[i].tagName);

      eDiv_Window.appendChild(tn_window);
      eUl_openTabs.appendChild(eDiv_Window);

      for(j=0; j<arr_tabsWithTags[i].tabs.length; j++){
        // (1) create all the DOM elements
        var eImg_leftIcon   = createHtmlElement("Img", [{ key: "src", value: arr_tabsWithTags[i].tabs[j].favIconUrl }, gp_attributes.leftImgStyle]);
        var eDiv_leftIcon   = createHtmlElement("Div", [gp_attributes.leftIconClass]);

        var tn_title        = document.createTextNode(arrangeTitle(arr_tabsWithTags[i].tabs[j].title));
        var eDiv_middleText = createHtmlElement("Div", [gp_attributes.middleTextClass]);

        var eImg_close      = createHtmlElement("Img", [gp_attributes.closeImgSrc, gp_attributes.closeImgStyle]);
        var eImg_audio;
        var eDiv_rightIcons = createHtmlElement("Div", [gp_attributes.rightIconsClass, gp_attributes.rightIconsStyle]);

        var eDiv_row        = createHtmlElement("Div", [gp_attributes.rowClass]);
        var eBtn_row;

        //eImg_audio
        if (arr_tabsWithTags[i].tabs[j].audible) {
            var b_muted = arr_tabsWithTags[i].tabs[j].mutedInfo.muted;
            eImg_audio      = createHtmlElement("Img", [{ key: "src", value: b_muted ? gp_files.noSoundImgUrl :gp_files.soundImgUrl  }, gp_attributes.audioImgStyle]);
        }
        //eBtn_row
        if (arr_tabsWithTags[i].tabs[j].highlighted) {
            eBtn_row        = createHtmlElement("Button", [gp_attributes.btnClassHighlight,gp_attributes.btnStyleHighlight ]);
        } else {
            eBtn_row        = createHtmlElement("Button", [gp_attributes.btnClass,gp_attributes.btnStyle]);
        }

        // (2) add liseners
        if (arr_tabsWithTags[i].tabs[j].audible) {
            muteOnClick(eImg_audio, arr_tabsWithTags[i].tabs[j].id);
        }
        listner_listObject(eUl_openTabs, eBtn_row, arr_tabsWithTags[i].tabs[j]);
        closeOnClick(eUl_openTabs, eBtn_row, eImg_close, arr_tabsWithTags[i].tabs[j].id);

        // (3) append children
        eDiv_leftIcon.appendChild(eImg_leftIcon);
        // eB_tabIndex.appendChild(tn_tabIndex);
        eDiv_middleText.appendChild(tn_title);
        // eDiv_middleText.appendChild(eB_tabIndex);

        if (arr_tabsWithTags[i].tabs[j].audible) {
            eDiv_rightIcons.appendChild(eImg_audio);
        }
        eDiv_rightIcons.appendChild(eImg_close);

        eDiv_row.appendChild(eDiv_leftIcon);
        eDiv_row.appendChild(eDiv_middleText);
        eDiv_row.appendChild(eDiv_rightIcons);

        eBtn_row.appendChild(eDiv_row);

        eUl_openTabs.appendChild(eBtn_row);

      }//close for loop
    }//close for loop

} // close addAllTabsToDOM

// ============================================================
// arrange title (remove long strings)
// ============================================================
function arrangeTitle(s_tabSitle) {
    var result = "";
    var sArr_words = s_tabSitle.split(" ");
    for (var i = 0; i < sArr_words.length; i++) {
        if (sArr_words[i].length > 40) {
            result = result + " " + sArr_words[i].substring(0, 40) + "...";
        } else {
            result = result + " " + sArr_words[i];
        }
    }
    return result;
};


// ============================================================
// ============================================================
function createHtmlElement(s_elementName, propertyArr) {
    var newTagElement = document.createElement(s_elementName);
    if(propertyArr == null){
      return newTagElement;
    }
    for (var i = 0; i < propertyArr.length; i++) {
        newTagElement.setAttribute(propertyArr[i].key, propertyArr[i].value);
    }
    return newTagElement;
};



// ============================================================
// ============================================================
function arrangeTabsByTags(tabs){

  // contain an array of tabs and tags
  var arr_tabsWithTags = [];
  var obj_noTagTabs = {tagName: "no tag", tabs: []};

  var i;
  for(i = 0 ; i < tabs.length ; i++){


    s_tabTag = window.localStorage.getItem(tabs[i].url);

    if(s_tabTag == null){
      obj_noTagTabs.tabs.push(tabs[i]);

    }else{
      var j;
      for(j=0; j < arr_tabsWithTags.length; j++){
        if(arr_tabsWithTags[j].tagName == s_tabTag){
          arr_tabsWithTags[j].tabs.push(tabs[i]);
          break;
        }
      }// for tabsWithtags
      //didnt find tag in tabsWithTags
      if(j == arr_tabsWithTags.length){
          var obj_tagTabs = {tagName: s_tabTag, tabs: [tabs[i]]};
          arr_tabsWithTags.push(obj_tagTabs);
      }

    }//else

  }//for tabs
  arr_tabsWithTags.push(obj_noTagTabs);

  return arr_tabsWithTags;
}
