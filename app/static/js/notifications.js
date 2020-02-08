$(document).ready(function() {

    // Notifications Shown on Icon Click
    $("#notifications-icon").click(function notificationsOpen() {

        var modalType = $("#notifications-icon").attr('class');
        modalOpen(modalType, '305px', '285px', '9%', '90px');

    });

    $(".close-notifications").click(function() {
        modalClose();
    });


    // Update Profile
    $(".update").click(function(){
        $(".notification-bar").css('display', 'block');
    });

    // Schedule Workout
    $(".schedule-workout").click(function(){
        $(".notification-bar").css('display', 'block');
        $('.light-box').attr('style', 'display: none;');
    });

    // Update Goal
    $(".add-new-goal").click(function(){
        $(".notification-bar").css('display', 'block');
        $('.light-box').attr('style', 'display: none;');
    });


    $(".close-icon").click(function(){
        $(".notification-bar").fadeOut();
    });


    function modalOpen(modalType, width, height, right, margin_top) {
        $('#' + modalType).attr('style','width: ' + width + '; height: ' + height + '; right: ' + right +
        '; margin-top: ' + margin_top + ';');
    };


    function modalClose() {
        $('.light-box').attr('style', 'display: none;');
    }


});
