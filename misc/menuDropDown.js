


// ============================================================
// ============================================================

function addTagsList(){

    var arr_tabsWithTags = getTabsWithTags()

    var div = document.getElementById('myTagsModalBody');
    div.innerHTML = ""
    for(i=0; i< arr_tabsWithTags.length; i++){
        var eP_test   = createHtmlElement("b", null);
        eP_test.innerHTML = arr_tabsWithTags[i].tagName;
        div.appendChild(eP_test);
        for(j=0; j< arr_tabsWithTags[i].arr_tabs.length; j++){
          eP_test   = createHtmlElement("p", null);
          eP_test.innerHTML = " - " + arr_tabsWithTags[i].arr_tabs[j];
          div.appendChild(eP_test);
        }//close for
    }//close for
}


// ============================================================
// ============================================================

function getTabsWithTags(){

  var arr_tabsWithTags = [];
  var urlKey, i = 0, j;
  while(urlKey = window.localStorage.key(i)){
    i++;
    var tagName = window.localStorage.getItem(urlKey)
    for(j=0 ; j< arr_tabsWithTags.length; j++){
      if(arr_tabsWithTags[j].tagName == tagName){
        arr_tabsWithTags[j].arr_tabs.push(urlKey);
        break;
      }
    }//close for

    if (j == arr_tabsWithTags.length){
      var obj_tabWithTag = {tagName: tagName, arr_tabs:[urlKey]}
      arr_tabsWithTags.push(obj_tabWithTag);
    }
  }//close for

  return arr_tabsWithTags;
}
