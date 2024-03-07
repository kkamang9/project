(function ($) {
    'use strict';

    function splittingTextDelay(object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i = 0; i < splitLength; i++) {
            if ($(object).data('css-property') == 'animation') {
                $(object).find('.char').eq(i).css('animation-delay', delay_speed + (i * speed) + 's');
            } else if ($(object).data('css-property') == 'transition') {
                $(object).find('.char').eq(i).css('transition-delay', delay_speed + (i * speed) + 's');
            }
        }
    }

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요
        
        //메인비주얼 슬라이드 시작
        var $visualSlide = $('.visual_wrap .visual_box .visual_slide');
        $visualSlide.slick({
            accessibility: true,
            speed : 1000,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: true,
            arrows : false,
            fade: true,
            dots : false,
            autoplay : true,
            autoplaySpeed: 4000,
            isRunOnLowIE : true,
            pauseOnSwipe : false,
            pauseOnHover: false,
            pauseOnFocus: false,
            zIndex : 0,
            responsive : [{}]
        });
        //메인비주얼 슬라이드 끝
        
        //공지사항 슬라이드 시작
        var $noticeSlide = $('.notice_wrap .notice_box .notice_slide');
        $noticeSlide.slick({
            accessibility: true,
            speed : 1000,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            rows: 1,
            slidesPerRow: 1,
            variableWidth : false,
            infinite: false,
            arrows : false,
            fade: false,
            dots : false,
            autoplay : false,
            isRunOnLowIE : true,
            vertical: true,
            verticalSwiping: true,
            zIndex : 0,
            responsive : [{}]
        });
        //공지사항 슬라이드 끝
        
        //갤러리 슬라이드 시작
        var $galleryBox = $('.gallery_wrap .gallery_box'),
            $gallerySlide = $galleryBox.find('.gallery_slide'),
            $galleryPrev = $galleryBox.find('.slide_button_wrap .button_box.prev .btn'),
            $galleryNext = $galleryBox.find('.slide_button_wrap .button_box.next .btn');
        $gallerySlide.slick({
            accessibility: true,
            variableWidth: false,
            adaptiveHeight: false,
            arrows: true,
            prevArrow: $galleryPrev,
            nextArrow: $galleryNext,
            dots: false,
            rows: 1,
            slidesPerRow: 1,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            autoplay: false,
            zIndex: 0,
            responsive : [
                {
                    breakpoint : 1001,
                    settings : {
                        slidesToShow: 3,
                    }
                },{
                    breakpoint : 641,
                    settings : {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        //갤러리 슬라이드 끝
    });
})(jQuery);
