(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        
        //버튼 효과 스크립트 시작
        var $TempBtnIcon = $('.temp_btn.icon_type');
        
        function eachTempBtn($tempBtn){
            $tempBtn.each(function(){
                var $this = $(this);
                
                addMoveText($this.find('a'));
                addMoveText($this.find('button'));
                addMoveText($this.find('input[type="submit"]'));
                
                function addMoveText($MoveBtn) {
                    var $parent = $MoveBtn.parent(),
                        text = $MoveBtn.is('input') ? $MoveBtn.val() : $MoveBtn.text(),
                        sizeClass = $parent.hasClass('medium') ? 'medium' : ($parent.hasClass('small') ? 'small' : ''),
                        cssValue = sizeClass === 'medium' ? 25 : (sizeClass === 'small' ? 20 : 30);
                    
                    $parent.append('<i class="move_text">'+text+'</i>');
                    var $moveText = $parent.find('.move_text');
                    
                    $parent.on('mouseover', function(){
                        $moveText.css({'left' : 'calc(100% - '+$moveText.outerWidth()+'px - ' + cssValue + 'px)' });
                    }).on('mouseleave', function(){
                        $moveText.removeAttr('style');
                    });
                }
            });
        }
        
        eachTempBtn($TempBtnIcon);
        //버튼 효과 스크립트 끝
        
        // 사이드메뉴 버튼 스크립트 시작
        var $mapContentWrap = $('.map_content_wrap'),
            $sideOpenBtn = $mapContentWrap.find('.map_info_wrap .side_open_box .btn');
        $sideOpenBtn.on('click',function(){
            if($mapContentWrap.is('.side_closed') === true){
                $mapContentWrap.removeClass('side_closed');
                $(this).attr('title','사이드메뉴 닫기');
            } else if($mapContentWrap.is('.side_closed') === false){
                $mapContentWrap.addClass('side_closed');
                $(this).attr('title','사이드메뉴 열기');
            }
        });
        // 사이드메뉴 버튼 스크립트 끝

    });
})(jQuery);