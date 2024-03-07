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
        // 달력 가져오기
        window.getCal = function(dateYMD) {
            $.ajax({
                url : '/young/schdulCldr.do',
                data : {
                    sc5 : dateYMD
                },
                dataType : 'html',
                success : function(data) {
                    $('.calendar_box').html(data);
                }
            });
        };

        // 비주얼 슬라이드
        var $visualSlide = $('.visual_wrap .visual_box .visual_slide'),
            $visualItemLast = $('.visual_wrap .visual_box .visual_slide .slide_item:last-child'),
            $visualPrev = $('.visual_wrap .visual_box .visual_button_wrap .prev .btn'),
            $visualNext = $('.visual_wrap .visual_box .visual_button_wrap .next .btn');

        $visualSlide.prepend($visualItemLast).slick({
            speed : 1000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            isRunOnLowIE : true,
            zIndex : 0,
            responsive : [{}]
        });

        // 청년정책 슬라이드
        var $boardSlide = $('.policy_wrap .policy_box .board_wrap .board_list .board_item .board_slide');
        $boardSlide.each(function (){
            var $this = $(this),
                $boardItem = $this.parents('.board_item'),
                $boardPrev = $boardItem.find($('.board_button_wrap .prev .btn')),
                $boardNext = $boardItem.find($('.board_button_wrap .next .btn'));
            $this.slick({
                speed : 1000,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite: true,
                arrows : true,
                prevArrow : $boardPrev,
                nextArrow : $boardNext,
                isRunOnLowIE : true,
                zIndex : 0,
                responsive : [{
                    breakpoint : 1001,
                    settings : {
                        slidesToShow : 2
                    }
                },{
                    breakpoint: 641,
                    settings: {
                        slidesToShow : 1
                    }
                }]
            });
        });
        // 천년정책 탭메뉴
        var $categoryItem = $('.policy_box .category_wrap .category_list .category_item'),
            $categoryBtn = $('.policy_box .category_wrap .category_list .category_item .btn'),
            $boardItem = $('.policy_box .board_wrap .board_list .board_item');
        $categoryBtn.on('click',function (){
            var $this = $(this),
                $categoryIndex = $this.parents($categoryItem).index();

            $categoryBtn.removeAttr('title', '선택됨').eq($categoryIndex).attr('title', '선택됨');
            $categoryItem.removeClass('active').eq($categoryIndex).addClass('active');
            $boardItem.removeClass('active').eq($categoryIndex).addClass('active').find($boardSlide).slick('setPosition');
        });

        // 켈린더 슬라이드
        // $('.info_wrap .calendar_box .calendar_date .date_slide').slick({
        //     speed : 500,
        //     dots : false,
        //     draggable : true,
        //     swipe : true,
        //     swipeToSlide : true,
        //     slidesToShow : 1,
        //     slidesToScroll : 1,
        //     infinite: false,
        //     arrows : true,
        //     prevArrow : $('.info_wrap .calendar_box .calendar_date .calendar_button_wrap .prev .btn'),
        //     nextArrow : $('.info_wrap .calendar_box .calendar_date .calendar_button_wrap .next .btn'),
        //     isRunOnLowIE : true,
        //     zIndex : 0,
        //     responsive : [{}]
        // });


        // 공지사항 탭메뉴
        var $titleItem = $('.info_wrap .notice_box .title_list .title_item'),
            $noticeBtn = $('.info_wrap .notice_box .title_list .title_item .btn'),
            $contentItem = $('.info_wrap .notice_box .content_list .content_item');
        $noticeBtn.on('click',function (){
            var $this = $(this),
                $noticeIndex = $this.parents($titleItem).index();
            $titleItem.removeClass('active').find($noticeBtn).removeAttr('title');
            $this.attr('title', '선택됨').parent($titleItem).addClass('active');
            $contentItem.removeClass('active').eq($noticeIndex).addClass('active');
        });

        /* 공통 팝업 슬라이드 시작 */
        // var $ocPopup = $('.oc_popup');
        // $ocPopup.each(function(){
        //     var $this = $(this),
        //         $ocPopupList = $this.find('.oc_popup_list'),
        //         $ocPopupPrev = $this.find('.prev'),
        //         $ocPopupNext = $this.find('.next'),
        //         $ocPopupAuto = $this.find('.auto'),
        //         $ocPopupCurrent = $this.find('.current'),
        //         $ocPopupTotal = $this.find('.total');
        //     $ocPopupList.slick({
        //         //기본
        //         autoplay : true,
        //         dots : false,
        //         draggable : true,
        //         swipe : true,
        //         swipeToSlide : true,
        //         slidesToShow : 1,
        //         slidesToScroll : 1,
        //         variableWidth : false,
        //         infinite : true,
        //         arrows : true,
        //         prevArrow : $ocPopupPrev,
        //         nextArrow : $ocPopupNext,
        //         autoArrow : $ocPopupAuto,
        //         pauseText : '정지',
        //         playText : '재생',
        //         total : $ocPopupTotal,
        //         current : $ocPopupCurrent,
        //         pauseOnArrowClick : true,
        //         pauseOnDirectionKeyPush : true,
        //         pauseOnSwipe : true,
        //         pauseOnDotsClick : true,
        //         zIndex : 1,
        //         fade : false
        //     });
        // });
        /* 공통 팝업 슬라이드 끝 */

    });
})(jQuery);