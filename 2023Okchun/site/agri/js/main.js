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

        //비주얼 슬라이드
        var $visualSlick = $('.visual .visual_wrap .visual_box .visual_slick'),
            $visualAuto = $('.visual .visual_wrap .visual_box .visual_auto .btn');
        $visualSlick.slick({
            accessibility: true,
            arrows: false,
            autoArrow : $visualAuto,
            pauseText : '정지',
            playText : '재생',
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            fade: true,
            infinite: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnDotsHover: false,
            swipe: true,
            touchMove: true
        });

        //바로가기 슬라이드
        var $shortcutSlick = $('.shortcut .shortcut_wrap .shortcut_slick'),
            $shortcutPrev = $('.shortcut_button_wrap .button_box.prev .btn'),
            $shortcutNext = $('.shortcut_button_wrap .button_box.next .btn');
        $shortcutSlick.slick({
            accessibility: true,
            arrows: true,
            prevArrow: $shortcutPrev,
            nextArrow: $shortcutNext,
            dots: false,
            infinite: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnDotsHover: false,
            swipe: true,
            touchMove: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });

        //스크롤 이벤트
        var $scrollEvent = $('.scroll_event');
        $scrollEvent.each(function (){
            var $this = $(this),
                $windowTop = $window.scrollTop(),
                $scrollTop = $this.offset().top - 700,
                $scrollHeight = $this.outerHeight() + 700,
                $scrollArea = $scrollTop + $scrollHeight;
            if ($windowTop > $scrollTop && $windowTop < $scrollArea){
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
        $window.on('scroll',function (){
            $scrollEvent.each(function (){
                var $this = $(this),
                    $windowTop = $window.scrollTop(),
                    $scrollTop = $this.offset().top - 700,
                    $scrollHeight = $this.outerHeight() + 650,
                    $scrollArea = $scrollTop + $scrollHeight;
                if ($windowTop > $scrollTop && $windowTop < $scrollArea){
                    $this.addClass('active');
                } else {
                    $this.removeClass('active');
                }
            });
        });

    });
})(jQuery);