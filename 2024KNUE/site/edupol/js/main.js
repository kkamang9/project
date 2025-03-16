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

        /* 1.메인슬라이드/메인슬라이드 메뉴 */
        var $MainSlideBox = $('.rowgroup1 .main_slide_box'),
            $MainSlideList = $MainSlideBox.find('.main_slide_list'),
            $MainProgress = $MainSlideBox.find('.main_progress'),
            $controller = $MainSlideBox.find('.main_slide_control'),
            $autoplayButton = $MainSlideBox.find('.slick-arrow.auto'),
            $bar = $MainSlideBox.find('.progress_bar'),
            time = 2,
            isPause = false, // 일시정지 상태 여부
            tick,
            percentTime,
            changeWhenPaused, // 일시정지 상태에서 슬라이드를 전환했는지 여부
            $MainMenuBox = $('.rowgroup1 .main_menu_box'),
            $MainMenuList = $MainMenuBox.find('.main_menu_list');

        $MainSlideList.slick({
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 500,
            cssEase: 'linear',
            dots : true,
            appendDots: '.dots_inner',
            customPaging: function (slider, i) {
                return '<button class="dots_btn"><span>'+'슬라이드'+i+'</span></button>';
            },
            arrows : true,
            infinite : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            //추가 기능
            prevArrow: $MainSlideBox.find('.slick-arrow.prev'),
            nextArrow: $MainSlideBox.find('.slick-arrow.next'),
            autoArrow : $MainSlideBox.find('.slick-arrow.auto'),
            pauseText : '정지',
            playText : '재생',
            isRunOnLowIE : false,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : false,
            pauseOnDotsClick : true,
        });
        $MainSlideList.on("beforeChange",function(event, slick, currentSlide, nextSlide) {
            $MainSlideBox.removeClass("on");
            startProgressbar();
            if (isPause) changeWhenPaused = true; // 일시정지 상태일때 슬라이드 전환
        });
        $MainSlideList.on("afterChange", function(event, slick, current){
            $MainSlideBox.addClass("on");

        });
        $('.main_slide_box').addClass("on");

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            if (!isPause) {
                tick = setInterval(interval, 20); // 일시정지 상태가 아니면 재생시작
            }
        }

        function interval() {
            if (!isPause) {
                percentTime += 1 / (time + 0.1);
                $bar.css({
                    width: percentTime + "%"
                });
                if (percentTime >= 100) {
                    $MainSlideList.slick("slickNext");
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $bar.css({
                width: 0 + "%"
            });
            clearTimeout(tick);
        }

        $autoplayButton.on('click', function(){
            if (!isPause) {
                $controller.attr('data-autoplay', 'N');
                isPause = true;
            } else {
                $controller.attr('data-autoplay', 'Y');
                isPause = false;
                if (changeWhenPaused) {
                    startProgressbar(); // 일시정지 상태에서 슬라이드 전환 후 재생버튼 클릭시 재생시작
                    changeWhenPaused = false;
                }
            }
        });

        startProgressbar();

        $MainMenuList.slick({
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            autoplay : false,
            dots : false,
            arrows : false,
            infinite : false,
            variableWidth: true,
            slidesToShow : 6,
            slidesToScroll : 1,
            //추가 기능
            isRunOnLowIE : false,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : false,
            pauseOnDotsClick : true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 5,
                    }
                },
                {
                    breakpoint: 906,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 4,
                    }
                },
                {
                    breakpoint: 721,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 3,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 4,
                    }
                },
                {
                    breakpoint: 531,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 3,
                    }
                },
                {
                    breakpoint: 396,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        slidesToShow : 2,
                    }
                },
            ]
        });


        /* 2.공지사항 */
        var $NoticeBox = $('.rowgroup2 .notice_box'),
            $NoticeList = $NoticeBox.find('.notice_list');

        $NoticeList.slick({
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            autoplay : false,
            dots : false,
            arrows : false,
            infinite : false,
            slidesToShow : 4,
            slidesToScroll : 1,
            //추가 기능
            isRunOnLowIE : false,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : false,
            pauseOnDotsClick : true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        variableWidth: true,
                        slidesToShow : 3,
                    }
                },
                {
                    breakpoint: 811,
                    settings: {
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        variableWidth: true,
                        slidesToShow : 2,
                    }
                },
            ]
        });


        /* 5.gallery 포토앨범 */
        var $GallerySlideBox = $('.rowgroup5 .gallery_box'),
            $GallerySlideList = $GallerySlideBox.find('.gallery_list');
        $GallerySlideList.slick({
            autoplay : false,
            dots : false,
            arrows : true,
            infinite : true,
            slidesToShow: 1,
            rows : 1,
            slidesPerRow : 4,
            slidesToScroll: 1,
            //추가 기능
            prevArrow: $GallerySlideBox.find('.slick-arrow.prev'),
            nextArrow: $GallerySlideBox.find('.slick-arrow.next'),
            total : $GallerySlideBox.find('.slick-text.total'),
            current : $GallerySlideBox.find('.slick-text.current'),
            isRunOnLowIE : false,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : false,
            pauseOnDotsClick : true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesPerRow : 3
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        slidesPerRow : 2
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesPerRow : 1
                    }
                },
            ]
        });



    });
})(jQuery);