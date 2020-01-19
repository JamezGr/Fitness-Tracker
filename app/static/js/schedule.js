$(document).ready(function() {

daysInCurrentSchedule();
getCurrentDate();

    // Notifications Shown on Icon Click
    $(".calendar-day").click(function () {

        var current_date = $(".day-text").text();
        var current_date = current_date.split(' ');

        var week_day = current_date[0].replace(',', '');
        var day_number = current_date[1].replace(current_date[1].slice(-2), '');
        var month = current_date[2];
        var year = current_date[3];

        var date = $(this).attr("class");
        var date_string = date.split(' ');
        var day_number = date_string[0].split('-');
        var day = day_number[1];

        getDateSelected(year, getSelectedMonth(month), day);

        $("#calendar-day").attr('style', 'display: block; height: 100%;');

        if (day > 31 || (date_string[3] && date_string[3]=="past")) {
            $(".notification-bar").css('display', 'block');
            $(".notification-text").text("Unable to Schedule Workout on Selected Date. Please Try Again.");
            $("#calendar-day").attr('style', 'display: none; height: 100%;');
        }
    });


    $(".close-schedule").click(function () {

        alert("All unsaved changes will be discarded. ");
        $("#calendar-day").attr('style', 'display: none;');
    });


    $(".next-month").click(function () {

        var scheduled_month = $(".schedule-month").text();
        var scheduled_month = scheduled_month.trim();

        var real_month = scheduled_month.split(' ');
        var month = real_month[0];
        var year = real_month[1];

        var month_number = getSelectedMonth(real_month[0]);

        console.log(real_month[0]);
        console.log(month_number);
        console.log(year);


        // console.log(scheduled_month);
        // var current_month = getSelectedMonth()

    });

    $(".previous-month").click(function () {

        console.log("Previous Month Clicked");
    });

});

function getSelectedMonth(month) {

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

    return months[month]

}


function getCurrentDate() {

    var current_date = $(".day-text").text();
    var current_date = current_date.split(' ');

    var week_day = current_date[0].replace(',', '');
    var day_number = current_date[1].replace(current_date[1].slice(-2), '');
    var month = current_date[2];
    var year = current_date[3];

    let daysInMonth = getDaysInMonth(year, month);

    daysInCurrentSchedule(day_number, daysInMonth);

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

function getDateSelected(year, month, day) {

    var weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    ];

    var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ];

    var date_selected = new Date(year + "-" + month + "-" + day);
    var date = date_selected.getFullYear() + '-' + (date_selected.getMonth()+1) + '-' + date_selected.getDate();

    var weekday = date_selected.getDay();


    // Add Ending to Day Number
    if (day == "1" || (day.endsWith("1") && parseInt(day) > 20)) {
        day = day.toString() + "st";
    }

    else if (day == "2" || (day.endsWith("2") && parseInt(day) > 20)) {
        day = day.toString() + "nd";
    }

    else if (day == "3" || (day.endsWith("3") && parseInt(day) > 20)) {
        day = day.toString() + "rd";
    }

    else if (day == "11" || day == "12" || day == "13") {
        day = day.toString() + "th";
    }

    else {
        day = day.toString() + "th"
    }


    var final_date_format = weekdayNames[weekday] + ", " + day.toString() + " " + monthNames[month - 1]

    // console.log(weekdayNames[weekday] + ", " + day.toString() + " " + monthNames[month - 1]);

    $(".box-heading")[1].innerText = "Schedule a Workout For " + final_date_format;

    // console.log($(".box-heading")[1].innerText);

}