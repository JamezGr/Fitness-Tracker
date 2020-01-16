$(document).ready(function() {

daysInCurrentSchedule();
getCurrentDate();

    // Notifications Shown on Icon Click
    $(".calendar-day").click(function () {

        var date = $(this).attr("class");
        var date_string = date.split(' ');
        var day_number = date_string[0].split('-');

        console.log(day_number[1]);

        $("#calendar-day").attr('style', 'display: block; height: 100%;');
    });


    $(".close-schedule").click(function () {

        alert("All unsaved changes will be discarded. ");
        $("#calendar-day").attr('style', 'display: none;');
    });

});


function getCurrentDate() {

    // Code For Each Month ie. January = First Month = 1, December = Twelfth Month = 12
    var months = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
    }


    var current_date = $(".day-text").text();
    var current_date = current_date.split(' ');

    let week_day = current_date[0].replace(',', '');
    let day_number = current_date[1].replace(current_date[1].slice(-2), '');
    let month = current_date[2];
    let year = current_date[3];

    let daysInMonth = getDaysInMonth(year, month);

    daysInCurrentSchedule(day_number, daysInMonth);

    console.log(daysInMonth);
    console.log(day_number);

}


function daysInCurrentSchedule(current_day, daysInMonth) {

    days = [];

    var selected_day = 1;

    while (selected_day < current_day) {
        $(".day-" + selected_day.toString()).addClass("past");
        selected_day++;
    }


    $(".calendar-day").each(function() {

        let day = $(this).attr('class');
        let date_format = day.split(' ');

        let day_format = date_format[0].split('-');
        let day_number = day_format[1];

        days.push(day_number);

    });

}


function getDaysInMonth(year, month) {

    var days_in_months = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
    }

    if (year % 4 == 0) {
        days_in_months["February"] = 29;
    }

    return days_in_months[month]

}