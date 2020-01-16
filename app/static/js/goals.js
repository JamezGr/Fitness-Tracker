$(document).ready(function() {

    // Notifications Shown on Icon Click
    $(".add-new").click(function notificationsOpen() {

        var modalType = "add-new";
        modalOpen(modalType, '650px', '200px', '400px', '200px');

    });

    $(".close-schedule").click(function() {
        modalClose();
    });


    function modalOpen(modalType, width, height, left, margin_top) {
        $('#' + modalType).attr('style','width: ' + width + '; height: ' + height + '; left: ' + left +
        '; margin-top: ' + margin_top + ';');
    };


    function modalClose() {
        $('.light-box').attr('style', 'display: none;');
    }


});


