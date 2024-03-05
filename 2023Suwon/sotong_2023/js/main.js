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
        var $container = $('#container'),
            $notice = $container.find('.rowgroup2 .notice_wrap'),
            $noticeButtonWrap = $notice.find('.notice_button_wrap'),
            $noticeButtonItem = $noticeButtonWrap.find('.button_list .button_item'),
            $noticeBtn = $noticeButtonItem.find('.btn'),
            $noticeContentsWrap = $notice.find('.notice_contents_wrap'),
            $noticeContentsItem = $noticeContentsWrap.find('.contents_item'),
            $siteWrap = $container.find('.rowgroup2 .site_wrap'),
            $accordionWrap = $siteWrap.find('.accordion_wrap'),
            $accordionBtn = $accordionWrap.find('.btn_open'),
            $siteList = $accordionWrap.find('.site_list');

        // 비주얼 페이드인
        $container.find('.rowgroup1 .main_visual .visual_text .text_item').addClass('on');

        // 공지사항 탭메뉴
        $noticeBtn.on('click',function (){
            var $this = $(this),
                $noticeIndex = $this.parent($noticeButtonItem).index();

            $noticeBtn.removeClass('active').removeAttr('title');
            $this.addClass('active').attr('title', '선택됨');
            $noticeContentsItem.removeClass('active').eq($noticeIndex).addClass('active');
        });

        // 사이트 버튼 아코디언
        $accordionBtn.on('click',function (){
            var $this = $(this);
            $this.parents($accordionWrap).siblings($accordionWrap).find($accordionBtn).removeClass('active').attr('title','메뉴열기').next($siteList).stop().slideUp();
            $this.toggleClass('active').next().stop().slideToggle();
            if ($this.hasClass('active') === true){
                $this.attr('title','메뉴닫기');
            } else {
                $this.attr('title','메뉴열기');
            }
        });


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);