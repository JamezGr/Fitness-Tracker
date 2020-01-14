$(document).ready(function() {

    // Notifications Shown on Icon Click
    $("#notifications-icon").click(function() {
        modalOpen('305px', '285px', '9%', '90px');
    });

    $(".close-notifications").click(function() {
        modalClose();
    });


    function modalOpen(width, height, right, margin_top) {

        $('.light-box').attr('style','width: ' + width + '; height: ' + height + '; right: ' + right +
        '; margin-top: ' + margin_top + ';');

    };


    function modalClose() {

        $('.light-box').attr('style', 'display: none;');

    }


});


