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
        var $tabWrap = $('.tab_wrap'),
            $tabBtnList = $tabWrap.find('.tab_button_list'),
            $tabBtnItem = $tabBtnList.find('.tab_button_item'),
            $tabBtn = $tabBtnItem.find('button.btn'),
            $tabConList = $tabWrap.find('.tab_contents_list'),
            $tabConItem = $tabConList.find('.tab_contents_item');

        // 탭메뉴
        $tabBtn.on('click',function (){
            var $this = $(this),
                $tabIndex = $this.parent($tabBtnItem).index();
            $this.parent($tabBtnItem).addClass('active').siblings().removeClass('active').parent($tabBtnList).next($tabConList).find($tabConItem).removeClass('active').eq($tabIndex).addClass('active');
            $this.attr('title','선택됨').parent($tabBtnItem).siblings().find($tabBtn).removeAttr('title');
        });

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);