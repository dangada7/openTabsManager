var gp_color = {
  green       :  "lightgreen",
  blue        :  "lightblue",
  yellow      :  "#ffff7f",
  darkBlue    :  "#5e90af",
  darkPurple  :  "#2E0854",
  purple      :  "#551A8B"
};

var gp_files = {
  closeImgUrl   : "../images/close.png" ,
  noSoundImgUrl : "../images/noSound.png",
  soundImgUrl   : "../images/sound.png",
};

var gp_attributes = {
    leftImgStyle      : { key: "style", value: "width: 20px;" },
    leftIconClass     : { key: "class", value: "col-xs-1" },
    middleTextClass   : { key: "class", value: "col-xs-9" },
    closeImgStyle     : { key: "style", value: "width: 10px; margin-right:10px" },
    rightIconsClass   : { key: "class", value: "col-xs-1.5" },
    rightIconsStyle   : { key: "style", value: "text-align:right;" },
    rowClass          : { key: "class", value: "row" },
    closeImgSrc       : { key: "src",   value: gp_files.closeImgUrl},
    audioImgStyle     : { key: "style", value: "width: 20px; margin-right:10px"},
    btnStyleHighlight : { key: "style", value: "margin-top:2px; background-color:" + gp_color.blue},
    btnClassHighlight : { key: "class", value: "list-group-item tab" },
    btnClass          : { key: "class", value: "list-group-item tab" },
    btnStyle          : { key: "style", value: "margin-top:2px;" },
    liDividerStyle    : { key: "style", value: "border-style: ; border-width: 3px; text-align: center; margin-top:4px; font-size:150%; color:white; background-color:"+ gp_color.darkPurple},
    liDividerClass    : { key: "class", value: "list-group-item" },
    style_subTitle    : { key: "style", value: "border-style: ; border-width: 3px; text-align: center; margin-top:2px; font-size:130%; color:white; background-color:"+ gp_color.purple},
};

var gp_localStorageKeys = {
  openTabsManagerWinId : "openTabsManagerWid",
  backGroundWindowId   : "backGroundWindowId",
};

var gp_keys = {
  delete  : 46 ,
  enter   : 13 ,
  t       : 84 ,
};
