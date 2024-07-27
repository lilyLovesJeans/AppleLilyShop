
var today = new Date();
var todayFormatted = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
var startDate = $('#date_timepicker_start').val();
var endDate = $('#date_timepicker_end').val();

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
        $('.error_msg').hide();
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
        $('.error_msg').hide();
        updateDateDisplay();

    }
});

//秀出天數 
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
//計算天數
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

 // 将日期字符串转换为 Date 对象并格式化
function parseAndFormatDate(dateStr) {
    var parts = dateStr.split('/');
    
    // 检查日期格式是否正确
    if (parts.length !== 3) {
        return null; // 格式不正确，返回 null
    }
    
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // 月份从 0 开始
    var day = parseInt(parts[2], 10);
    
    var testDate = new Date(year, month, day);
    
    // 检查日期是否与原始输入匹配
    if (testDate.getFullYear() !== year || testDate.getMonth() !== month || testDate.getDate() !== day) {
        return null; // 日期无效，返回 null
    }

    return testDate.getFullYear() + '/' + 
           (testDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
           testDate.getDate().toString().padStart(2, '0');
}


// 當使用者直接輸入時，判斷日期正確性
document.addEventListener('input', function(event) {
    // $('.error_msg').hide();
    var inputElement = event.target;
    var inputDate = $(inputElement).val();
    
    var formattedDate = parseAndFormatDate(inputDate);
    
    if (formattedDate === null) {
        // console.log('hi~');
        $('.error_msg').show().text('Invalid date format!');
        return;
    }
    // 获取 startDate 和 endDate 的值
    var startDate = $('#date_timepicker_start').val();
    var endDate = $('#date_timepicker_end').val();
    
    var formattedStartDate = parseAndFormatDate(startDate);
    var formattedEndDate = parseAndFormatDate(endDate);
    
    var today = new Date();
    var todayFormatted = today.getFullYear() + '/' + 
                         (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                         today.getDate().toString().padStart(2, '0');
    
    // 比较日期
    if (formattedDate < todayFormatted) {
        $('.error_msg').show().text('Please input a date after today!');
        $('.selected_date').hide();
    } else if (formattedEndDate && formattedStartDate && formattedEndDate < formattedStartDate) {
        $('.error_msg').show().text('End date cannot be before start date!');
        $('.selected_date').hide();

    } else {
        $('.error_msg').hide();
        // console.log('hi~~~~');
        updateDateDisplay();
    }

});
