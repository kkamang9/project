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

        // 메인비주얼 슬라이드 시작
        var $visualBox = $('.visual_wrap .visual_box'),
            $visualSlide = $visualBox.find('.visual_slide'),
            $visualPrev = $visualBox.find('.button_wrap .button_box.prev .btn'),
            $visualNext = $visualBox.find('.button_wrap .button_box.next .btn');
        $visualSlide.slick({
            speed : 1200,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: true,
            arrows : true,
            fade: true,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            dots : false,
            autoplay : true,
            autoplaySpeed: 5000,
            isRunOnLowIE : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            zIndex : 0,
            responsive : [{}]
        });
        $visualSlide.on('beforeChange', function (){
            $visualBox.addClass('slide_action');
            setTimeout(function (){
                $visualBox.removeClass('slide_action');
            },1000);
        });
        // 메인비주얼 슬라이드 끝

        // 메인비주얼 텍스트 스플리팅 플러그인 시작
        Splitting();
        setTimeout(function (){
            $visualBox.addClass('split_on');
        }, 2500);
        var $splittingTxt = $visualBox.find('.visual_slide .visual_item .text_wrap');
        $splittingTxt.each(function(){
            var $this = $(this),
                $renderWord = $this.find('.title .word'),
                $renderChar = $this.find('.desc .char');
            $renderWord.css('animation-delay','calc(300ms * var(--word-index))');
            $renderChar.css('animation-delay','calc(50ms * var(--char-index))');
        });
        // 메인비주얼 텍스트 스플리팅 플러그인 끝

        // 문학기행 탭메뉴 시작
        var $travelTab = $('.travel_wrap .travel_box .tab_box'),
            $travelButtonBox = $travelTab.find('.button_wrap .button_box'),
            $travelBtn = $travelButtonBox.find('.btn'),
            $travelContentBox = $travelTab.find('.content_wrap .content_item');
        $travelBtn.mouseover(function(){
            var $this = $(this),
                $travelIndex = $this.parent($travelButtonBox).index();
            $travelButtonBox.removeClass('active').find($travelBtn).removeAttr('title');
            $this.attr('title', '선택됨').parent($travelButtonBox).addClass('active');
            $travelContentBox.removeClass('active').eq($travelIndex).addClass('active');
        });
        $travelBtn.on('click',function (){
            var $this = $(this),
                $travelIndex = $this.parent($travelButtonBox).index();
            $travelButtonBox.removeClass('active').find($travelBtn).removeAttr('title');
            $this.attr('title', '선택됨').parent($travelButtonBox).addClass('active');
            $travelContentBox.removeClass('active').eq($travelIndex).addClass('active');
        });
        // 문학기행 탭메뉴 끝

        // 바로가기 슬라이드 시작
        var $shortcutSlide = $('.shortcut_wrap .shortcut_box .shortcut_slide');
        $shortcutSlide.slick({
            speed : 1000,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: false,
            arrows : false,
            dots : false,
            autoplay : false,
            isRunOnLowIE : true,
            zIndex : 0,
            responsive : [
                {
                    breakpoint : 1371,
                    settings : {
                        slidesToShow : 3,
                    }
                },{
                    breakpoint : 921,
                    settings : {
                        slidesToShow : 2,
                    }
                },{
                    breakpoint : 551,
                    settings : {
                        slidesToShow : 1,
                    }
                }
            ]
        });
        // 바로가기 슬라이드 끝

        // 문학관 안내 슬라이드 시작
        var $guideBox = $('.guide_wrap .guide_box'),
            $guideSlide = $guideBox.find('.guide_slide'),
            $guideSlideItemLast = $guideSlide.find('.guide_item:last-child'),
            $guidePrev = $guideBox.find('.button_wrap .button_box.prev .btn'),
            $guideNext = $guideBox.find('.button_wrap .button_box.next .btn');
        $guideSlide.prepend($guideSlideItemLast);
        $guideSlide.slick({
            speed : 1000,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow: $guidePrev,
            nextArrow: $guideNext,
            dots : true,
            autoplay : false,
            isRunOnLowIE : true,
            zIndex : 0,
            responsive : [{}]
        });
        // 문학관 안내 슬라이드 끝
    });
})(jQuery);
