document.addEventListener('DOMContentLoaded', function() {

  sortAndsetTabs();

  //listenerLib
  addMyEventsListener();
  


    // document.getElementById('container').onclick = function(event) {
    //   var span, input, text;
    //
    //   // Get the event (handle MS difference)
    //   event = event || window.event;
    //
    //   // Get the root element of the event (handle MS difference)
    //   span = event.target || event.srcElement;
    //
    //   // If it's a span...
    //   if (span && span.tagName.toUpperCase() === "SPAN") {
    //     // Hide it
    //     span.style.display = "none";
    //
    //     // Get its text
    //     text = span.innerHTML;
    //
    //     // Create an input
    //     input = document.createElement("input");
    //     input.type = "text";
    //     input.size = Math.max(text.length / 4 * 3, 4);
    //     span.parentNode.insertBefore(input, span);
    //
    //     // Focus it, hook blur to undo
    //     input.focus();
    //     input.onblur = function() {
    //       // Remove the input
    //       span.parentNode.removeChild(input);
    //
    //       // Update the span
    //       span.innerHTML = input.value;
    //
    //       // Show the span again
    //       span.style.display = "";
    //     };
    //   }
    // };



}, false);

function sortAndsetTabs(){
  //add all the tabs
  chrome.windows.getAll({populate: true}, function(windows) {

      for(var i=0; i < windows.length; i++)
        windows[i].tabs = sortTabs(windows[i].tabs);

      addAllTabsToDOMAndSetLiseners(windows);

  }); // close chrome.tabs.getAllInWindow

}

// document.body.addEventListener("keydown", function(e) {
//   // alert("")
//
// });




// select sort.
$(function() {
  $("select").change(function() {
      var str = "";
      $('.list-group .list-group-item').each(function() {
          $(this).remove();
      });
      sortAndsetTabs();
  });
});


//search input
$(function() {
    $('#input-search').on('keyup', function(e) {
        //click on Esc
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
