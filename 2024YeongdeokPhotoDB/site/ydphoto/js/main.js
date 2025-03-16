(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        var $row1 = $('.rowgroup1');
        setTimeout(function(){
            $row1.addClass('ready_on');
        }, 1);

        //스크롤 애니메이션 시작
        var $AniOn = $('.ani_on');
        $window.on('scroll', function(){
            if($window.width() > 640){
                $AniOn.each(function(){
                    var $this = $(this),
                        WinTop = $window.scrollTop(),
                        WinBottom = WinTop + $window.height(),
                        WinMiddle = (WinTop + WinBottom) / 2,
                        ThisOffset = $this.offset(),
                        ThisOffsetTop = ThisOffset.top;
                        if (ThisOffsetTop < WinMiddle + 200) {
                            $this.addClass('active');
                        } else {
                            $this.removeClass('active');
                        }
                });
            }
        });
        //스크롤 애니메이션 끝

        //비쥬얼 슬라이드 시작
        var $Visual = $('.visual_wrap'),
            $VisualSlide = $Visual.find('.visual_slide_list');
        $VisualSlide.slick({
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 5000,
            infinite: true,
            dots: false,
            draggable: false,
            swipe: false,
            swipeToSlide: false,
            slidesToShow: 1,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $('.visual_wrap .visual_slide_control .prev'),
            nextArrow: $('.visual_wrap .visual_slide_control .next'),
            pauseOnHover: true,
            pauseOnArrowClick: true,
            fade: true,
            zIndex: 1
        });
        //비쥬얼 슬라이드 끝

        //살펴보는 관광여행 슬라이드 시작
        //살펴보는 관광여행 슬라이드 끝

        //맛있는 영덕 특산물 슬라이드 시작
        //맛있는 영덕 특산물 슬라이드 끝

        //옛사진 슬라이드 시작
        //옛사진 슬라이드 끝
    });
})(jQuery);