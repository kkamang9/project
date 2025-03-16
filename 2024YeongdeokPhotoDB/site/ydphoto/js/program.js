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
        var $galleryProgram = $('.gallery_program'),
            $galleryTitle = $galleryProgram.find('.gallery_detail .gallery_title'),
            $itemAnchor = $galleryProgram.find('.relation .item_list .item .item_anchor');
        $itemAnchor.on('click',function(){
            var $galleryTitleTop = $galleryTitle.offset();
            $html.animate({scrollTop : $galleryTitleTop.top},300);
        });

    });
})(jQuery);