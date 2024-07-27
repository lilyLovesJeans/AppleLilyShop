$(function(){
    // Get today's date in the required format
    var today = new Date();
    var todayFormatted = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    
    $('#date_timepicker_start').datetimepicker({
        format: 'Y/m/d',
        minDate: todayFormatted, // Set minimum date to today
        onShow: function(ct) {
            this.setOptions({
                maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
            });
        },
        timepicker: false,
        onSelectDate: function(ct, $i) {
            updateDateDisplay();
        }
    });

    $('#date_timepicker_end').datetimepicker({
        format: 'Y/m/d',
        minDate: todayFormatted, // Set minimum date to today
        onShow: function(ct) {
            this.setOptions({
                minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : todayFormatted
            });
        },
        timepicker: false,
        onSelectDate: function(ct, $i) {
            updateDateDisplay();
        }
    });

    function updateDateDisplay() {
        var startDate = $('#date_timepicker_start').val();
        var endDate = $('#date_timepicker_end').val();
        if (startDate && endDate) {
            var daysCount = calculateDaysDifference(startDate, endDate);
            $('#from').text(startDate);
            $('#to').text(endDate);
            $('#days').text(daysCount);
            $('#nights').text((daysCount-1));
            $('.selected_date').show();
        }
    }

    function calculateDaysDifference(start, end) {
        if (!start || !end) {
            return '';
        }
        var startDate = new Date(start);
        var endDate = new Date(end);
        var timeDiff = endDate.getTime() - startDate.getTime();
        var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
        return daysDiff;
    }
});
