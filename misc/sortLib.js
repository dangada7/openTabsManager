//the only funtion that i use outside of this lib is: sort

function sortTabs(tabs){
  var selectValue = $( "select" ).val();

  if(selectValue == "Sites"){
    tabs.sort(sortByIcon);
  }else if (selectValue == "Audio"){
    tabs = sortByAudio(tabs);
  }
  return tabs;
}

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
