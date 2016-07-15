//this lib export one function - resetTabsList
//use liseners

function resetTabsList(tabs) {

    var eUl_openTabs = document.getElementById("openTabs");
    eUl_openTabs.setAttribute("style", "margin-top: .3cm; overflow-y: scroll; height:" + (screen.height - 220) + "px;");

    // for (j = 0; j < windows.length; j++) {
    //
    //     //if windwos[j] is open tabs manager
    //     if( parseInt(localStorage.getItem("openTabsManagerWid")) == windows[j].id){
    //       continue;
    //     }
    //
    //     tabs = windows[j].tabs;
    //     var eDiv_Window = createHtmlElement("div", [gp_attributes.liDividerStyle, {key:"id",value:"winTitle"}/*, {key:"contenteditable",value:"true"}*/]);
    //     var tn_window   = document.createTextNode("Window-" + (j + 1) + ":");
    //
    //     AddEventListener_eDiv_winTitle(eDiv_Window);
    //
    //     eDiv_Window.appendChild(tn_window);
    //     eUl_openTabs.appendChild(eDiv_Window);

        for (i = 0; i < tabs.length; i++) {

            // (1) create all the DOM elements
            var eImg_leftIcon   = createHtmlElement("Img", [{ key: "src", value: tabs[i].favIconUrl }, gp_attributes.leftImgStyle]);
            var eDiv_leftIcon   = createHtmlElement("Div", [gp_attributes.leftIconClass]);

            var tn_title        = document.createTextNode(arrangeTitle(tabs[i].title));
            var tn_tabIndex     = document.createTextNode(" (" + (tabs[i].index + 1) + ")");
            var eDiv_middleText = createHtmlElement("Div", [gp_attributes.middleTextClass]);

            var eB_tabIndex     = createHtmlElement("b", null);

            var eImg_close      = createHtmlElement("Img", [gp_attributes.closeImgSrc, gp_attributes.closeImgStyle]);
            var eImg_audio;
            var eDiv_rightIcons = createHtmlElement("Div", [gp_attributes.rightIconsClass, gp_attributes.rightIconsStyle]);

            var eDiv_row        = createHtmlElement("Div", [gp_attributes.rowClass]);
            var eBtn_row;

            //eImg_audio
            if (tabs[i].audible) {
                var b_muted = tabs[i].mutedInfo.muted;
                eImg_audio      = createHtmlElement("Img", [{ key: "src", value: b_muted ? gp_files.noSoundImgUrl :gp_files.soundImgUrl  }, gp_attributes.audioImgStyle]);
            }
            //eBtn_row
            if (tabs[i].highlighted) {
                eBtn_row        = createHtmlElement("Button", [gp_attributes.btnClassHighlight,gp_attributes.btnStyleHighlight ]);
            } else {
                eBtn_row        = createHtmlElement("Button", [gp_attributes.btnClass,gp_attributes.btnStyle]);
            }

            // (2) add liseners
            if (tabs[i].audible) {
                muteOnClick(eImg_audio, tabs[i].id);
            }
            listner_listObject(eUl_openTabs, eBtn_row, tabs[i]);
            closeOnClick(eUl_openTabs, eBtn_row, eImg_close, tabs[i].id);

            // (3) append children
            eDiv_leftIcon.appendChild(eImg_leftIcon);
            eB_tabIndex.appendChild(tn_tabIndex);
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
    // } //close for-loop
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
