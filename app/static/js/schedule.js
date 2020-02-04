// wait for document to load
$(document).ready(function() {

  class CreateSchedule {
    constructor() {
      this.current_date = $(".day-text").text().split(' ');
      this.current_day_number = this.current_date[1].replace(this.current_date[1].slice(-2), '');
      this.current_month = this.current_date[2];
      this.current_year_number = this.current_date[3];

      this.scheduled_date = $(".schedule-month").text().trim().split(' ');
      this.scheduled_month = this.scheduled_date[0];
      this.scheduled_year = this.scheduled_date[1];


      // get month number from month name
      this.getFullMonth = function(month) {
        let month_number = {
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
          "December": 12,
        }
        return month_number[month]
      }

      // get number of days in month selected
      this.getDaysInMonth = function(month) {
        let days_in_months = {
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

      // get number of days in current month in schedule
      this.daysInCurrentSchedule = function() {
        let days = [];

        let current_day_number = this.current_day_number;
        let selected_day = 1;

        while (selected_day < current_day_number) {
          $(".day-" + selected_day.toString()).addClass("past");
          selected_day++;
        }

        // for all days that exist on the Calendar
        $(".calendar-day").each(function() {
            let day = $(this).attr('class');
            let date_format = day.split(' ');

            let day_format = date_format[0].split('-');
            let day_number = day_format[1];

            days.push(day_number);
        });
      }

      // get date in Format - Monday 1st January 2020
      this.getDateSelected = function(year, month, day) {
        let weekdayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
            ];

        let monthNames = [
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

        // create date Object with YY/MM/DD Format
        let date_selected = new Date(year + "-" + month + "-" + day);

        // format Date Object as YY-MM-DD
        let date = date_selected.getFullYear() + '-' + (date_selected.getMonth()+1) + '-' + date_selected.getDate();

        // Get Name of Weekday based on Day Selected in Schedule
        let weekday = date_selected.getDay();

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
        return final_date_format
        // $(".box-heading")[1].innerText = "Schedule a Workout For " + final_date_format;
      }
    }
  }

  // number to months conversion
  let month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  }


  let createSchedule = new CreateSchedule();
  createSchedule.daysInCurrentSchedule();

  let curent_day_number = createSchedule.current_day_number;
  let scheduled_month_number = createSchedule.getFullMonth(createSchedule.scheduled_month);
  let scheduled_year = createSchedule.scheduled_year;


  $(".next-month").click(function() {
    let current_day_number = createSchedule.current_day_number;
    let current_month_number = createSchedule.getFullMonth(createSchedule.current_month);
    let current_year_number = createSchedule.current_year_number;

    scheduled_month_number++;

    if (scheduled_month_number > 12) {
      scheduled_month_number = 1;
      scheduled_year++;
    }

    if (scheduled_month_number > current_month_number && scheduled_year >= current_year_number) {
      $(".calendar-day").each(function() {
        $(this).removeClass("past");
      });
    }

    if (scheduled_year > current_year_number) {
      $(".calendar-day").each(function() {
          $(this).removeClass("past");
      });
    }

    if (scheduled_month_number == current_month_number && scheduled_year == current_year_number) {
      let selected_day = 1;

      // reset style of calendar when current month and year is selected
      $(".calendar-day").each(function() {
          $(this).removeClass("past");
      });

      while (selected_day < current_day_number) {
        $(".day-" + selected_day.toString()).addClass("past");
        selected_day++;
      }
    }

    $(".schedule-month").text(month[scheduled_month_number] + " " + scheduled_year);
  });



  $(".previous-month").click(function() {
    let curent_day_number = createSchedule.current_day_number;
    let current_month_number = createSchedule.getFullMonth(createSchedule.current_month);
    let current_year_number = createSchedule.current_year_number;

    scheduled_month_number--;

    if (scheduled_month_number < 1) {
      scheduled_month_number = 12;
      scheduled_year--;
    }

    if (scheduled_month_number < current_month_number && scheduled_year <= current_year_number) {
      $(".calendar-day").each(function() {
          $(this).addClass("past");
      });
    }

    if (scheduled_year < current_year_number) {
      $(".calendar-day").each(function() {
        let day = $(this).attr('class');
          $(this).addClass("past");
      });
    }

    if (scheduled_month_number == current_month_number && scheduled_year == current_year_number) {
      createSchedule.daysInCurrentSchedule();
    }

    $(".schedule-month").text(month[scheduled_month_number] + " " + scheduled_year);
  });








//
// class selectDate {
//
// }
//
// // TODO: rewrite script in classes
// // TODO: rewrite all functions - refactoring
// // TODO: create function for Days, Months, Weeks. Return Data
//
//
// var months = {
//     "January": 1,
//     "February": 2,
//     "March": 3,
//     "April": 4,
//     "May": 5,
//     "June": 6,
//     "July": 7,
//     "August": 8,
//     "September": 9,
//     "October": 10,
//     "November": 11,
//     "December": 12
//     }
//
// var current_date = $(".day-text").text();
// var current_date = current_date.split(' ');
//
// var week_day = current_date[0].replace(',', '');
// var current_day_number = current_date[1].replace(current_date[1].slice(-2), '');
//
// var scheduled_month = $(".schedule-month").text();
// var scheduled_month = scheduled_month.trim();
//
// var real_month = scheduled_month.split(' ');
// var current_month = real_month[0];
// var current_month_number = months[current_month];
// var current_year = real_month[1];
// var year_number = current_year;
// var month_number = getSelectedMonth(real_month[0]);
//
// // DEBUGGING PURPOSES
// console.log(month_number);
// console.log(current_month);
// console.log(current_year);
// console.log(year_number);
//
// daysInCurrentSchedule();
// getCurrentDate(current_month_number, month_number);
//
//     // Notifications Shown on Icon Click
//     $(".calendar-day").click(function () {
//
//         var current_date = $(".day-text").text();
//         var current_date = current_date.split(' ');
//
//         var week_day = current_date[0].replace(',', '');
//         var day_number = current_date[1].replace(current_date[1].slice(-2), '');
//         var month = current_date[2];
//         var year = current_date[3];
//
//         var date = $(this).attr("class");
//         var date_string = date.split(' ');
//         var day_number = date_string[0].split('-');
//         var day = day_number[1];
//
//
//         getDateSelected(year, getSelectedMonth(month), day);
//
//         $("#calendar-day").attr('style', 'display: block; height: 100%;');
//
//         if (day > 31 || (date_string[3] && date_string[3]=="past")) {
//             $(".notification-bar").css('display', 'block');
//             $(".notification-text").text("Unable to Schedule Workout on Selected Date. Please Try Again.");
//             $("#calendar-day").attr('style', 'display: none; height: 100%;');
//         }
//     });
//
//
//     $(".close-schedule").click(function () {
//
//         alert("All unsaved changes will be discarded. ");
//         $("#calendar-day").attr('style', 'display: none;');
//     });
//
//
//     $(".next-month").click(function () {
//         const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
//
//         // console.log(current_year);
//
//         if (month_number < 12) {
//
//             month_number++;
//             console.log(month_number);
//             console.log(current_month_number);
//             console.log(getKey(months, month_number)  + " " + year_number);
//
//             $(".schedule-month").text(getKey(months, month_number)  + " " + year_number);
//         }
//
//         else if (month_number = 13){
//             month_number = 1;
//             year_number++;
//             console.log(month_number);
//             console.log(current_month_number);
//             console.log(getKey(months, month_number) + " " + year_number);
//
//             $(".schedule-month").text(getKey(months, month_number)  + " " + year_number);
//         }
//
//         if (month_number > current_month_number) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).removeClass("past");
//                 }
//             });
//         }
//
//         else if (month_number == current_month_number) {
//             var selected_day = 1;
//
//             while (selected_day < current_day_number) {
//                 $(".day-" + selected_day.toString()).addClass("past");
//                 selected_day++;
//             }
//         }
//
//         if (year_number > current_year) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).removeClass("past");
//                 }
//             });
//         }
//
//         else if (year_number < current_year) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).addClass("past");
//                 }
//             });
//         }
//
//     });
//
//     $(".previous-month").click(function () {
//         const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
//
//         if (month_number >= 1) {
//
//             month_number--;
//             console.log(month_number);
//             console.log(current_month_number);
//             console.log(getKey(months, month_number)  + " " + year_number);
//
//             $(".schedule-month").text(getKey(months, month_number)  + " " + year_number);
//         }
//
//         if (month_number < 1){
//
//             month_number = 12;
//             year_number--;
//             console.log(month_number);
//             console.log(current_month_number);
//             console.log(getKey(months, month_number)  + " " + year_number);
//
//             $(".schedule-month").text(getKey(months, month_number)  + " " + year_number);
//         }
//
//         if (month_number > current_month_number) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).removeClass("past");
//                 }
//             });
//         }
//
//         else if (month_number == current_month_number) {
//             var selected_day = 1;
//
//             while (selected_day < current_day_number) {
//                 $(".day-" + selected_day.toString()).addClass("past");
//                 selected_day++;
//                 console.log(month_number);
//                 console.log(current_month_number);
//                 console.log(getKey(months, month_number)  + " " + year_number);
//             }
//         }
//
//         if (year_number > current_year) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).removeClass("past");
//                 }
//             });
//         }
//
//         else if (year_number < current_year) {
//             $(".calendar-day").each(function() {
//                 var day = $(this).attr('class');
//
//                 if (day.includes("past")) {
//                     $(this).addClass("past");
//                 }
//             });
//         }
//
//
//     });
//
// });
//
// function getSelectedMonth(month) {
//
//     // Code For Each Month ie. January = First Month = 1, December = Twelfth Month = 12
//     var months = {
//     "January": 1,
//     "February": 2,
//     "March": 3,
//     "April": 4,
//     "May": 5,
//     "June": 6,
//     "July": 7,
//     "August": 8,
//     "September": 9,
//     "October": 10,
//     "November": 11,
//     "December": 12
//     }
//
//     return months[month]
//
// }
//
//
// function getCurrentDate(current_month_number, month_number) {
//
//     var current_date = $(".day-text").text();
//     var current_date = current_date.split(' ');
//
//     var week_day = current_date[0].replace(',', '');
//     var day_number = current_date[1].replace(current_date[1].slice(-2), '');
//     var month = current_date[2];
//     var year = current_date[3];
//
//     let daysInMonth = getDaysInMonth(year, month);
//
//     daysInCurrentSchedule(day_number, daysInMonth, current_month_number, month_number);
//
// }
//
//
// function daysInCurrentSchedule(current_day, daysInMonth, current_month_number, month_number) {
//
//     days = [];
//
//     var selected_day = 1;
//
//     while (selected_day < current_day) {
//         $(".day-" + selected_day.toString()).addClass("past");
//         selected_day++;
//     }
//
//
//     $(".calendar-day").each(function() {
//
//         var day = $(this).attr('class');
//         var date_format = day.split(' ');
//
//         var day_format = date_format[0].split('-');
//         var day_number = day_format[1];
//
//         days.push(day_number);
//
//     });
// }
//
//
// function getDaysInMonth(year, month) {
//
//     var days_in_months = {
//     "January": 31,
//     "February": 28,
//     "March": 31,
//     "April": 30,
//     "May": 31,
//     "June": 30,
//     "July": 31,
//     "August": 31,
//     "September": 30,
//     "October": 31,
//     "November": 30,
//     "December": 31
//     }
//
//     if (year % 4 == 0) {
//         days_in_months["February"] = 29;
//     }
//
//     return days_in_months[month]
//
// }
//
// function getDateSelected(year, month, day) {
//
//     var weekdayNames = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday'
//     ];
//
//     var monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//     ];
//
//     var date_selected = new Date(year + "-" + month + "-" + day);
//     var date = date_selected.getFullYear() + '-' + (date_selected.getMonth()+1) + '-' + date_selected.getDate();
//
//     var weekday = date_selected.getDay();
//
//
//     // Add Ending to Day Number
//     if (day == "1" || (day.endsWith("1") && parseInt(day) > 20)) {
//         day = day.toString() + "st";
//     }
//
//     else if (day == "2" || (day.endsWith("2") && parseInt(day) > 20)) {
//         day = day.toString() + "nd";
//     }
//
//     else if (day == "3" || (day.endsWith("3") && parseInt(day) > 20)) {
//         day = day.toString() + "rd";
//     }
//
//     else if (day == "11" || day == "12" || day == "13") {
//         day = day.toString() + "th";
//     }
//
//     else {
//         day = day.toString() + "th"
//     }
//
//
//     var final_date_format = weekdayNames[weekday] + ", " + day.toString() + " " + monthNames[month - 1]
//
//     // console.log(weekdayNames[weekday] + ", " + day.toString() + " " + monthNames[month - 1]);
//
//     $(".box-heading")[1].innerText = "Schedule a Workout For " + final_date_format;
//
//     // console.log($(".box-heading")[1].innerText);
//
});
