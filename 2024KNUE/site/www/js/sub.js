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
        //테이블 마지막 td 강조
        var $pointTabLink = $('.table_point_wrap').find('.cts_total .tab_box .tab_list .tab_item .tab_link'),
            $lastPoint = $('.last_point');
        $lastPoint.each(function(){
            var $this = $(this),
                $pointLine = $this.find('.point_line'),
                $lastColWidth = $this.find('.table colgroup col:last-child').css('width');
            $pointLine.css('width',$lastColWidth);
            $pointTabLink.on('click',function(){
                var $lastColWidth = $this.find('.table colgroup col:last-child').css('width');
                $pointLine.css('width',$lastColWidth);
            });
            $window.resize(function(){
                var $lastColWidth = $this.find('.table colgroup col:last-child').css('width');
                $pointLine.css('width',$lastColWidth);
            });
        });

    });
})(jQuery);