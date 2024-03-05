(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요
        $('.calendar_table .btn').click(function(){
            $('.calendar_table .select').removeAttr('title');
            $('.calendar_table .select').removeClass('select');
            $(this).addClass('select');
            $(this).attr('title', '선택됨');
            $('h3.date>em.day').text($(this).attr('data-dpz'));

            if($(this).hasClass('no_schedule')) {
                $('.schedule_box').addClass('schedule_none');
            } else {
                $('.schedule_box').removeClass('schedule_none');
                showSchdul($(this).attr('data-did'));
            }
        });

        function showSchdul(date) {
            $('div.schedule_item').hide();
            $('.'+date).show();
        }

    });
})(jQuery);

function showTodaySchdul(date) {
    if($('div').hasClass(date)) {
        $('div.'+date).show();
    } else {
        $('.schedule_box').addClass('schedule_none');
    }
}