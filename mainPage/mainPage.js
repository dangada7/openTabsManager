document.addEventListener('DOMContentLoaded', function () {

    document.body.onkeydown = function (e) {
        if (e.keyCode == 27)
            window.close();
    }

    resetTabsList();

    //listenerLib
    addMyEventsListener();

}, false);


// select sort.
$(function () {
    $("select").change(function () {
        var str = "";
        $('.list-group .list-group-item').each(function () {
            $(this).remove();
        });
        $('.list-group #winTitle').each(function () {
            $(this).remove();
        });

        sortAndsetTabs();
    });
});

//search input
$(function () {
    $('#input-search').on('keyup', function (e) {
        //click on Esc
        if (e.keyCode == 27) {
            $(this).blur();
        }

        var rex = new RegExp($(this).val(), 'i');
        $('.list-group .tab').hide();

        $('.list-group .tab').filter(function () {
            return rex.test($(this).text());
        }).show();
    });
});
