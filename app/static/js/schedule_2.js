// when document content has loaded
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


        // get month number based on month string
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

          // get number of Days in Current Month Selected
          this.daysInCurrentSchedule = function() {
            days = [];

               let selected_day = 1;

               while (selected_day < current_day) {
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

          // get The Date Selected
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


      class EditScheduleStyle {
          constructor() {
            // get the date of the selected element from calendar
            this.date = $(this).attr("class");
            this.date_string = this.date.split(' ');
            this.day_number = this.date_string[0].split('-');

            this.day = day_number[1];
            this.month = CreateSchedule.scheduled_month;
            this.year = CreateSchedule.current_year_number;


            // change style for days that have past on schedule
            this.openScheduleWindow = function() {
                CreateSchedule.getDateSelected(EditScheduleStyle.year,
                EditScheduleStyle.month, EditScheduleStyle.day);

                $("#calendar-day").attr('style', 'display: block; height: 100%;');

                if (EditScheduleStyle.day > 31 || (EditScheduleStyle.date_string[3] && EditScheduleStyle.date_string[3]=="past")) {
                    $(".notification-bar").css('display', 'block');
                    $(".notification-text").text("Unable to Schedule Workout on Selected Date. Please Try Again.");
                    $("#calendar-day").attr('style', 'display: none; height: 100%;');
                }
            };

            // hide schedule window when close button clicked
            this.closeSchedule = function() {
              alert("All unsaved changes will be discarded. ");
              $("#calendar-day").attr('style', 'display: none;');
            };

            // move to next month of Schedule Calendar
            this.openNextMonth = function() {
                const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

                let scheduled_month = CreateSchedule.scheduled_month;
                let scheduled_month_number = CreateSchedule.getFullMonth(scheduled_month);
                let current_month = CreateSchedule.current_month;
                let current_month_number = CreateSchedule.getFullMonth(current_month);

                let scheduled_year = CreateSchedule.scheduled_year;
                let current_year = CreateSchedule.current_year_number;


                if (scheduled_month_number < 12) {
                  scheduled_month_number++;

                  // DEBUGGING PURPOSES
                  console.log(scheduled_month_number);
                  console.log(current_month_number);
                  console.log(scheduled_month_number + " " + scheduled_year_number);

                  $(".schedule-month").text(scheduled_month + " " scheduled_year_number);
                }

                else if (scheduled_month_number = 13) {
                  scheduled_month_number = 1;
                  scheduled_year++;

                  // DEBUGGING PURPOSES
                  console.log(scheduled_month_number);
                  console.log(current_month_number);
                  console.log(scheduled_month_number + " " + scheduled_year_number);
                }

                // remove past day styling for future dates in schedule calendar
                if (scheduled_month_number > current_month_number ) {
                  $(".calendar-day").each(function() {
                    var day = $(this).attr('class');

                    if (day.includes("past")) {
                      $(this).removeClass("past");
                    }
                });

                // restyle schedule if the current month is selected
                else if (scheduled_month_number == current_month_number) {
                  let selected_day = 1;

                  while (selected_day < current_day_number) {
                    $(".day-" + selected_day.toString()).addClass("past");
                    selected_day++;
                  }
                }

                if (scheduled_year_number > current_year_number) {
                  $(".calendar-day").each(function() {
                    var day = $(this).attr('class');

                    if (day.includes("past")) {
                        $(this).removeClass("past");
                    }
                  });
                }

                else if (scheduled_year_number < current_year_number) {
                  $(".calendar-day").each(function() {
                      var day = $(this).attr('class');

                      if (day.includes("past")) {
                          $(this).addClass("past");
                      }
                  });
                }
              }
            }

            this.previousMonth = function() {

              let scheduled_month = CreateSchedule.scheduled_month;
              let scheduled_month_number = CreateSchedule.getFullMonth(scheduled_month);
              let current_month = CreateSchedule.current_month;
              let current_month_number = CreateSchedule.getFullMonth(current_month);

              let scheduled_year = CreateSchedule.scheduled_year;
              let current_year = CreateSchedule.current_year_number;

              if (scheduled_month_number >= 1) {

                scheduled_month_number--;

                // DEBUGGING PURPOSES
                console.log(scheduled_month_number);
                console.log(current_month_number);
                console.log(scheduled_month_number + " " + scheduled_year_number);
              }
            }
          }
      }




      var createSchedule = new CreateSchedule();
      let current_month = createSchedule.current_month;
      let scheduled_month = createSchedule.scheduled_month;

      let current_day_number = createSchedule.current_day_number;
      let current_month_number = createSchedule.getFullMonth(current_month);
      let current_year_number = createSchedule.current_year_number;

      let scheduled_month_number = createSchedule.getFullMonth(scheduled_month);
      let scheduled_year_number = createSchedule.scheduled_year;

      let date_format = createSchedule.getDateSelected(current_year_number, current_month_number, current_day_number);

      console.log(current_day_number);
      console.log(current_month_number);
      console.log(current_year_number);

      console.log("\n" + scheduled_month_number);
      console.log(scheduled_year_number);

      console.log(date_format);

    });
