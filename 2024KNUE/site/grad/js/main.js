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
            $controller = $MainSlideBox.find('.main_slide_control'),
            $autoplayButton = $MainSlideBox.find('.slick-arrow.auto'),
            $bar = $MainSlideBox.find('.progress_percent'),
            time = 2,
            isPause = false, // 일시정지 상태 여부
            tick,
            percentTime,
            changeWhenPaused; // 일시정지 상태에서 슬라이드를 전환했는지 여부

        $MainSlideList.slick({
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 500,
            dots : false,
            arrows : true,
            infinite : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            fade : true,
            //추가 기능
            autoArrow : $MainSlideBox.find('.slick-arrow.auto'),
            total : $MainSlideBox.find('.total em'),
            current : $MainSlideBox.find('.current em'),
            pauseText : '정지',
            playText : '재생',
            isRunOnLowIE : true,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
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


        /* 2.대학원 소식/교육대학원 소식 */
        var $NoticeSlideBox = $('.rowgroup2 .notice_slide_box');

        $NoticeSlideBox.each(function (){
            var $thisBox = $(this),
                $NoticeSlideList = $thisBox.find('.notice_slide_list'),
                $NoticeProgress = $thisBox.find('.notice_progress'),
                $ProgressBar = $NoticeProgress.find( '.progress_bar' );

            $NoticeSlideList.slick({
                swipe: true,
                swipeToSlide: true,
                draggable: true,
                autoplay: false,
                autoplaySpeed: 5000,
                speed: 500,
                dots: false,
                arrows: true,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                //추가 기능
                prevArrow: $thisBox.find('.slick-arrow.prev'),
                nextArrow: $thisBox.find('.slick-arrow.next'),
                isRunOnLowIE: false,
                pauseOnFocus: true,
                pauseOnArrowClick: true,
                pauseOnDirectionKeyPush: true,
                pauseOnSwipe: false,
                pauseOnDotsClick: true,
                responsive: [
                    {
                        breakpoint: 1236,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 2,
                            variableWidth : true,
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            variableWidth : true,
                        }
                    },
                ]
            })

            $NoticeSlideList.on('beforeChange reInit', function(event, slick, currentSlide, nextSlide) {
                var slides = $NoticeSlideList.slick('slickGetOption', 'slidesToShow'),
                    calc = ( (nextSlide) / (slick.slideCount - slides)) * 100;

                $ProgressBar.css('width', calc + '%');
                /*$ProgressBar.text( calc + '% completed' );*/
            });
        })

        /* 2.대학원 소식/교육대학원 소식 - 탭 */
        $('.rowgroup2 .notice_tab_box .notice_tab_btn').on('click', function(){
            var $thisBtn = $(this),
                $MyParent = $thisBtn.parent('.notice_tab_item'),
                IsActive = $MyParent.is('.active'),
                $OtherParents = $MyParent.siblings('.notice_tab_item'),
                $OtherBtns = $OtherParents.find('.notice_tab_btn'),
                ParentsIndex = $MyParent.index();

            if(!IsActive){
                $MyParent.addClass('active');
                $OtherParents.removeClass('active');
                $thisBtn.attr('title', '선택됨');
                $OtherBtns.removeAttr('title');

                $NoticeSlideBox.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
                $NoticeSlideBox.eq(ParentsIndex).find('.notice_slide_list').slick('setPosition');
            }
        });


    });
})(jQuery);