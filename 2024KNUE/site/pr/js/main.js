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
        
        // main common
        var $rowGroup = $('.rowgroup');
        
        // section1 - VR 인트로 영상 시작
        var visualVideo = document.getElementById('visual_video'),
            $visualItem = $('.visual_wrap .visual_box .visual_list .visual_item'),
            $textWrap = $('.visual_wrap .text_wrap');
            
        visualVideo.addEventListener('ended', endedevent, false);
        function endedevent(e){
            $visualItem.removeClass('type_video');
            $textWrap.addClass('end_video');
        }
        // section1 - VR 인트로 영상 끝
        
        // section2 - campus tour
        var $rowGroup2 = $('.rowgroup2'),
            $tourWrap = $('.tour_wrap'),
            $bgList = $tourWrap.find('.bg_list'),
            $maskList = $tourWrap.find('.mask_list'),
            $tourLink = $tourWrap.find('.content_wrap .link_box .link'),
            $tourLinkShadow = $tourLink.find('.link_shadow path');
        // tour bg slick
        $bgList.slick({
            accessibility: true, //접근성
            rows: 1, //여러줄
            slidesToShow: 1, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            fade: true, //페이드 효과
            infinite: true, //무한반복
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false, //컨트롤러 사용 유무
        });
        // tour mask logo slick
        $maskList.slick({
            accessibility: true, //접근성
            rows: 1, //여러줄
            slidesToShow: 1, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            fade: true, //페이드 효과
            infinite: true, //무한반복
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false, //컨트롤러 사용 유무
        });
        // button svg animation
        $tourLink.on('mouseover',function(){
            $tourLinkShadow.attr('d','M 52 20 C 23 21 10 54 29 74 L 49 94 C 56 101 65 104 73 104 L 228 104 C 257 103 270 70 251 50 L 231 30 C 225 24 217 20 207 20 L 52 20');
        });
        $tourLink.on('mouseleave',function(){
            $tourLinkShadow.attr('d','M 32 0 C 3 1 -10 34 9 54 L 49 94 C 56 101 65 104 73 104 L 228 104 C 257 103 270 70 251 50 L 211 10 C 205 4 197 0 187 0 L 32 0');
        });
        
        // section3 - newsLetter
        // news card slide
        var $newsWrap = $('.news_wrap'),
            $newsBox = $newsWrap.find('.news_box'),
            $newsList = $newsBox.find('.news_list'),
            $newsItem = $newsList.find('.news_item'),
            $newsPrev = $newsWrap.find('.control_box .button_box.prev .btn'),
            $newsNext = $newsWrap.find('.control_box .button_box.next .btn'),
            newsLength = $newsItem.length,
            newsPaddingRight = $newsBox.css('padding-right'),
            newsPaddingTop = $newsBox.css('padding-top');
        // 화면 로딩 시 .news_item 의 position 값 제어
        setTimeout(function () {
            for (var i = 0; i < newsLength; i++) {
                $newsItem.eq(i).css({
                    'z-index': newsLength - i,
                    'left': 'calc((' + newsPaddingRight + ' / 3) * ' + i + ')',
                    'bottom': 'calc((' + newsPaddingTop + ' / 3) * ' + i + ')'
                });
            }
            $newsBox.find('.news_curtain').css('z-index', newsLength - 1)
        }, 1);
        // 탭접근 제어 함수
        function newsItemFirstTabIndex(){
            $newsItem.attr('tabindex', '-1').removeClass('news_active').find('.link').attr('tabindex', '-1');
            $newsItem.filter(':first-child').removeAttr('tabindex').addClass('news_active').find('.link').removeAttr('tabindex');
        }
        // 화면 로딩 시 탭접근 제어
        newsItemFirstTabIndex();
        
        var count = 0;
        
        //Prev 동작 첫 아이템 마지막으로 보냄(버튼 클릭 및 반응형 터치에 사용)
        $newsPrev.on('click', function () {
            $(this).addClass('anti_click');
            $newsItem.each(function () {
                var $this = $(this),
                    thisIndex = $this.index(),
                    $NextItem = $this.next('.news_item'),
                    nextBottom = $NextItem.css('bottom'),
                    nextLeft = $NextItem.css('left');
                $this.css({
                    'z-index': newsLength - thisIndex - 1,
                    'bottom': 'calc(' + nextBottom + ')',
                    'left': 'calc(' + nextLeft + ')'
                });
            });
            var firstBottom = $newsItem.filter(':first-child').css('bottom'),
                firstLeft = $newsItem.filter(':first-child').css('left');
            $newsList.prepend($newsItem.filter(':last-child').css({
                'z-index': newsLength,
                'bottom': firstBottom,
                'left': firstLeft
            }));
            $newsItem.filter(':first-child').addClass('prev_move');
            setTimeout(function () {
                $newsItem.filter(':first-child').removeClass('prev_move');
                newsItemFirstTabIndex();
                $newsPrev.removeClass('anti_click');
            }, 500);
        });
        // Next 동작 첫 아이템 마지막으로 보냄(버튼 클릭 및 반응형 터치에 사용)
        $newsNext.on('click', function () {
            $(this).addClass('anti_click');
            $newsItem.filter(':first-child').addClass('next_move');
            $newsItem.each(function () {
                var $this = $(this),
                    thisIndex = $this.index(),
                    $PrevItem = $this.prev('.news_item'),
                    prevBottom = $PrevItem.css('bottom'),
                    prevLeft = $PrevItem.css('left');
                $this.css({
                    'z-index': newsLength - thisIndex + 1,
                    'bottom': 'calc(' + prevBottom + ')',
                    'left': 'calc(' + prevLeft + ')'
                });
            });
            var lastBottom = $newsItem.filter(':last-child').css('bottom'),
                lastLeft = $newsItem.filter(':last-child').css('left');
            setTimeout(function () {
                $newsList.append($newsItem.filter(':first-child').css({
                    'z-index': 1,
                    'bottom': lastBottom,
                    'left': lastLeft
                }));
                $newsItem.filter(':last-child').removeClass('next_move');
                newsItemFirstTabIndex();
                $newsNext.removeClass('anti_click');
            }, 500);
        });
        
        //모바일에서 터치로 prev, next 동작
        // var touchStart;
        // $('.book_list').bind('touchstart', function (e) {
        //     touchStart = e.originalEvent.touches[0].clientX;
        // });
        // $('.book_list').bind('touchend', function (e) {
        //     var touchEnd = e.originalEvent.changedTouches[0].clientX;
        //     if (touchStart > touchEnd + 5) {
        //         bookPrev();
        //     } else if (touchStart < touchEnd - 5) {
        //         bookNext();
        //     }
        // });
        
        //윈도우 리사이즈 마다 , css에서 박스 padding-top , padding-right 값 추출하기
        $window.on('resize', function () {
            var resizeNewsPaddingRight = $('.news_box').css('padding-right'),
                resizeNewsPaddingTop = $('.news_box').css('padding-top');
            
            for (var i = 0; i < newsLength; i++) {
                $('.news_item').eq(i).css({
                    'left': 'calc((' + resizeNewsPaddingRight + ' / 3) * ' + i + ')',
                    'bottom': 'calc((' + resizeNewsPaddingTop + ' / 3) * ' + i + ')'
                });
            }
        });
        
        $window.on('screen:wide screen:web', function (event) {
            $rowGroup.addClass('gsap');
            // gsap plugin
            // IE11 호환 코드
            gsap.utils.toArray(".gsap").forEach(function(section, index) {
                gsap.to(this, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        end: "bottom 150%",
                        scrub: 80,
                        onUpdate: function(self) {
                            section.style.setProperty("--progress", self.progress);
                        }
                    }
                });
            });
            // svg line scroll event;
            $window.on('scroll', function() {
                var tourGsap = $rowGroup2.attr('style');
                
                // tourGsap이 null이 아닌지 확인
                if (tourGsap) {
                    var tourGsapCount = tourGsap.replace(/[^0-9]/g, '')[0];
                    
                    // tourGsapCount 값이 존재하고, 그 값이 1 이상인지 확인
                    if (tourGsapCount && tourGsapCount >= 1) {
                        $tourWrap.addClass('active');
                    } else {
                        $tourWrap.removeClass('active');
                    }
                } else {
                    // tourGsap이 null이면 active 클래스 제거
                    $tourWrap.removeClass('active');
                }
            });
        });
        $window.on('screen:tablet screen:phone', function (event) {
            $rowGroup.removeClass('gsap');
        });
    });
})(jQuery);