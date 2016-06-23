//this lib export one function - addAllTabsToDOMAndSetLiseners
//use liseners

function addAllTabsToDOMAndSetLiseners(windows) {

    var eUl_openTabs = document.getElementById("openTabs");
    eUl_openTabs.setAttribute("style", S_strings.uiStyle);

    for (j = 0; j < windows.length; j++) {
        //if windwos[j] is open tabs manager
        var i_openTabsManagerWid = parseInt(localStorage.getItem("openTabsManagerWid"));
        if( i_openTabsManagerWid == windows[j].id){
          continue;
        }

        tabs = windows[j].tabs;
        var eLi_divider = createHtmlElement("div", [S_property.liDividerStyle]);
        var tn_windowTitle    = document.createTextNode("Window-" + (j + 1) + ":");
        eLi_divider.appendChild(tn_windowTitle);
        eUl_openTabs.appendChild(eLi_divider);
        // eUl_openTabs.appendChild(eLi_divider);
        for (i = 0; i < tabs.length; i++) {

            // (1) create all the DOM elements
            var eImg_leftIcon   = createHtmlElement("Img", [{ key: "src", value: tabs[i].favIconUrl }, S_property.leftImgStyle]);
            var eDiv_leftIcon   = createHtmlElement("Div", [S_property.leftIconClass]);

            var tn_title        = document.createTextNode(arrangeTitle(tabs[i].title));
            var tn_tabIndex     = document.createTextNode(" (" + (tabs[i].index + 1) + ")");
            var eDiv_middleText = createHtmlElement("Div", [S_property.middleTextClass]);

            var eB_tabIndex     = createHtmlElement("b", null);

            var eImg_close      = createHtmlElement("Img", [S_property.closeImgSrc, S_property.closeImgStyle]);
            var eImg_audio;
            var eDiv_rightIcons = createHtmlElement("Div", [S_property.rightIconsClass, S_property.rightIconsStyle]);

            var eDiv_row        = createHtmlElement("Div", [S_property.rowClass]);
            var eBtn_row;

            //eImg_audio
            if (tabs[i].audible) {
                var b_muted = tabs[i].mutedInfo.muted;
                eImg_audio      = createHtmlElement("Img", [{ key: "src", value: b_muted ? S_strings.noSoundImgUrl :S_strings.soundImgUrl  }, S_property.audioImgStyle]);
            }
            //eBtn_row
            if (tabs[i].highlighted) {
                eBtn_row        = createHtmlElement("Button", [S_property.btnClassHighlight,S_property.btnStyleHighlight ]);
            } else {
                eBtn_row        = createHtmlElement("Button", [S_property.btnClass,S_property.btnStyle]);
            }

            // (2) add liseners
            if (tabs[i].audible) {
                muteOnClick(eImg_audio, tabs[i].id);
            }
            addBtnListener(eUl_openTabs, eBtn_row, tabs[i].index, tabs[i].id, tabs[i].highlighted, windows[j].id);
            closeOnClick(eUl_openTabs, eBtn_row, eImg_close, tabs[i].id);

            // (3) append children
            eDiv_leftIcon.appendChild(eImg_leftIcon);
            eB_tabIndex.appendChild(tn_title);
            eDiv_middleText.appendChild(tn_title);
            eDiv_middleText.appendChild(eB_tabIndex);

            if (tabs[i].audible) {
                eDiv_rightIcons.appendChild(eImg_audio);
            }
            eDiv_rightIcons.appendChild(eImg_close);

            eDiv_row.appendChild(eDiv_leftIcon);
            eDiv_row.appendChild(eDiv_middleText);
            eDiv_row.appendChild(eDiv_rightIcons);

            eBtn_row.appendChild(eDiv_row);

            eUl_openTabs.appendChild(eBtn_row);
        } //close for-loop
    } //close for-loop
} // close addAllTabsToDOM

//arrange title (remove long strings)
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

// create html element function
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
