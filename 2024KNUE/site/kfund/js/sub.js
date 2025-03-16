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
        $window.on('scroll', function (){
            var scrollValue = $(this).scrollTop();
            if (scrollValue > 1){
                $('.fixed_menu').addClass('scroll_active');
            }else{
                $('.fixed_menu').removeClass('scroll_active');
            }
        });

        var scrollValue = $window.scrollTop();
        if (scrollValue > 1){
            $('.fixed_menu').addClass('scroll_active');
        }else{
            $('.fixed_menu').removeClass('scroll_active');
        }

    });
})(jQuery);