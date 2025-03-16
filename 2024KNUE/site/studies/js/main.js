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
        // section1 - visual
        // text animation
        var $visualTitle = $('.visual_wrap .title_box'),
            $visualName = $visualTitle.find('.hidden_name'),
            $visualNameText = $visualName.text().split(''), // 텍스트 한글자씩 쪼개 담기
            $visualDesc = $visualTitle.find('.desc');
        // 태그 안의 기존 글자 삭제
        // $visualName.empty();
        // 글자수만큼 반복실행
        $visualTitle.prepend('<span class="name"></span>');
        for (var i = 0; i < $visualNameText.length; i++) {
            var $visualSplitText = '<em style="transition-delay:' + (i+1)*300 + 'ms;">' + $visualNameText[i] + '</em>';
            $visualTitle.find('.name').append($visualSplitText);
            $visualDesc.css('transition-delay','' + (i+2)*300 + 'ms');
        }
        // console.log($visualSplitText);
        
        
        
        // section2 - news
        // tab
        var $newsTab = $('.news_wrap .content_box .tab_wrap'),
            $newsTabBtn = $newsTab.find('.tab_button .button_box .btn'),
            $newsTabItem = $newsTab.find('.tab_contents .tab_item');
        $newsTabBtn.on('click',function(){
            var $this = $(this),
                thisIndex = $this.parent().index();
            $this.attr('title','선택됨').parent().addClass('active').siblings().removeClass('active').find($newsTabBtn).removeAttr('title');
            $newsTabItem.removeClass('active').eq(thisIndex).addClass('active');
        });
        
        // section3 - schedule
        // boars slide
        var $scheduleBoard = $('.schedule_wrap .board_box'),
            $scheduleBoardList = $scheduleBoard.find('.board_list'),
            $scheduleBoardPrev = $scheduleBoard.find('.control_box .button_box.prev .btn'),
            $scheduleBoardNext = $scheduleBoard.find('.control_box .button_box.next .btn');
        $scheduleBoardList.slick({
            accessibility: true, //접근성
            slidesToShow: 3, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            arrows: true, //컨트롤러 사용 유무
            prevArrow: $scheduleBoardPrev,
            nextArrow: $scheduleBoardNext,
            responsive: [{
                breakpoint: 1291,
                settings: {
                    slidesToShow: 2,
                }
            },{
                breakpoint: 1001,
                settings: {
                    variableWidth: true, //슬라이드 아이템의 width 를 css 로 제어
                    slidesToShow: 3,
                }
            },{
                breakpoint: 941,
                settings: {
                    variableWidth: true,
                    slidesToShow: 2,
                }
            },{
                breakpoint: 416,
                settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                }
            }]
        });
        
    });
})(jQuery);