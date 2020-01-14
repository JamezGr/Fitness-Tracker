$(document).ready(function() {

    // Notifications Shown on Icon Click
    $("#notifications-icon").click(function notificationsOpen() {

        var modalType = $("#notifications-icon").attr('class');
        modalOpen(modalType, '305px', '285px', '9%', '90px');

    });

    $(".close-notifications").click(function() {
        modalClose();
    });


    function modalOpen(modalType, width, height, right, margin_top) {

        $('#' + modalType).attr('style','width: ' + width + '; height: ' + height + '; right: ' + right +
        '; margin-top: ' + margin_top + ';');

    };


    function modalClose() {

        $('.light-box').attr('style', 'display: none;');

    }


});


