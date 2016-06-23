var S_color = {
  green   :  "lightgreen",
  blue    :  "lightblue",
  yellow  :  "#ffff7f",
};

var S_strings = {
  uiStyle       : "margin-top: .3cm; overflow-y: scroll; height:" + (screen.height - 220) + "px;",
  closeImgUrl   : "../images/close.png" ,
  noSoundImgUrl : "../images/noSound.png",
  soundImgUrl   : "../images/sound.png",
};

var S_property = {
    leftImgStyle      : { key: "style", value: "width: 20px;" },
    leftIconClass     : { key: "class", value: "col-xs-1" },
    middleTextClass   : { key: "class", value: "col-xs-9" },
    closeImgStyle     : { key: "style", value: "width: 10px; margin-right:10px" },
    rightIconsClass   : { key: "class", value: "col-xs-1.5" },
    rightIconsStyle   : { key: "style", value: "text-align:right;" },
    rowClass          : { key: "class", value: "row" },
    closeImgSrc       : { key: "src",   value: S_strings.closeImgUrl},
    audioImgStyle     : { key: "style", value: "width: 20px; margin-right:10px"},
    btnStyleHighlight : { key: "style", value: "margin-top:2px; background-color:" + S_color.blue },
    btnClassHighlight : { key: "class", value: "list-group-item" },
    btnClass          : { key: "class", value: "list-group-item" },
    btnStyle          : { key: "style", value: "margin-top:2px;" },
    liDividerStyle    : {key:"style",value:"font-size:150%; color:white; text-decoration: underline;"},
};
