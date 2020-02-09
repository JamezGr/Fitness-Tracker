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
        let year = this.scheduled_year;

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

        return final_date_format
        // $(".box-heading")[1].innerText = "Schedule a Workout For " + final_date_format;
      }
    }
  }

  class StyleSchedule {
    constructor(month) {
      this.month = month
    }

    displayModal(date) {
      $(".box-heading")[1].innerText = "Schedule a Workout For " + date;
      $("#calendar-day").fadeIn();
      $("#calendar-day").attr('style', 'display: block; height: 100%;');
    }

    displayScheduleError() {
      $(".notification-bar").css('display', 'block');
      $(".notification-text").text("Unable to Schedule Workout on Selected Date. Please Try Again.");
      $("#calendar-day").attr('style', 'display: none; height: 100%;');
    }

    styleInvalidDates(month) {
      let createSchedule = new CreateSchedule();
      let number_of_days_in_month = createSchedule.getDaysInMonth(month);

      // reset invalid dates each time month changes
      $(".calendar-day").each(function() {
        if ($(this).hasClass("invalid")) {
          $(this).removeClass("invalid");
        }
      });

      // for days not in month add styling
      $(".calendar-day").each(function() {
        let day = $(this).attr('class').split();
        let day_number = day[0].split("-")[1].split(" ")[0];

        if (day_number > number_of_days_in_month) {
          $(".day-" + day_number.toString()).addClass("invalid");
        }
      });

      return number_of_days_in_month
    }
  }

  class ScheduleWorkout {
    constructor() {
      this.test = "test";
    }

    newExercise() {
      console.log("New Exercise Clicked");
    }

    addExercise() {
      console.log("Exercise Added");
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
  let current_month_number = createSchedule.getFullMonth(createSchedule.current_month);

  let scheduled_month = createSchedule.scheduled_month;
  let scheduled_month_number = createSchedule.getFullMonth(scheduled_month);
  let scheduled_year = createSchedule.scheduled_year;

  let styleSchedule = new StyleSchedule();
  styleSchedule.styleInvalidDates(scheduled_month);

  let scheduleWorkout = new ScheduleWorkout();


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


  $(".calendar-day").click(function() {
    let createSchedule = new CreateSchedule();
    let calendar_day = $(this).attr("class");
    let calendar_day_array = calendar_day.split(" ");

    // find day number from current day selected in calendar
    let calendar_day_number = calendar_day_array[0].split("-")[1];

    // check if calendar day is currently selected
    let calendar_day_state = calendar_day_array[2];

    // check whether calendar day is past
    let calendar_day_time = calendar_day_array[3];

    // get selected month and year from schedule
    let calendar_month_year = $(".schedule-month").text().split(" ");
    let calendar_month = createSchedule.getFullMonth(calendar_month_year[0]);
    let calendar_year = calendar_month_year[1];

    // return final date format
    let calendar_date = createSchedule.getDateSelected(calendar_year, calendar_month, calendar_day_number);

    if ($(this).hasClass("past") || $(this).hasClass("invalid")) {
      styleSchedule.displayScheduleError();
    }

    else {
      styleSchedule.displayModal(calendar_date);
    }
  });

  $(".close-schedule").click(function() {
    $("#calendar-day").fadeOut();
  });


  $('.schedule-month').bind("DOMSubtreeModified",function(){
    let styleSchedule = new StyleSchedule();
    let scheduled_month_year = $(".schedule-month").text().trim().split(" ");
    let scheduled_month = scheduled_month_year[0];

    styleSchedule.styleInvalidDates(scheduled_month);
  });

  $(".add-new-exercise").click(function() {
    let new_exercise =
    // TODO : Render New Exercise HTML Dynamically
    '<div class="exercise">' +
      '<span class="exercise-number">Exercise ' + ($(".exercise-number").length + 1).toString() + ': </span>' +
      '<div class="exercise-name">' +
      '<select class="exercise-options">' +
        '<option value="squat">Squat</option>' +
        '<option value="bench">Bench</option>' +
        '<option value="deadlift">Deadlift</option>' +
      '</select>' +

      '<span class="exercise-sets"> Sets: ' +
        '<input type="number" name="sets" min="1" max="10">' +
      '</span>' +

      '<span class="exercise-reps"> Reps: ' +
        '<input type="number" name="reps" min="1" max="100">' +
      '</span>' +
    '</div></div>'



    if ($(".exercise-number").length < 10) {
        // add exercise to list
        $(".exercise-list").append(new_exercise);
        // scroll to bottom of list automatically once exercise added to list
        $(".exercise-list")[0].scrollTop = $(".exercise-list")[0].scrollHeight;
    }
    else {
      console.log("ERROR: Reached Max Number of Exercises for Workout.")
    }
  });
});
