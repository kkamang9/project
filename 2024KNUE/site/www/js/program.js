//게시판 대체텍스트를 위한 파라미터 추출 함수 시작
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//게시판 대체텍스트를 위한 파라미터 추출 함수 끝

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

        //게시판 대체텍스트 파라미터 판단 ajax 시작
        var nttNo = getParameterByName('nttNo'),
            PhotoLength = $('.p-table__content').find('.p-photo').length;
        if(nttNo){
            if(PhotoLength){
                var $BbsPhoto = $('.p-table__content > .p-photo');
                $BbsPhoto.each(function(){
                    var $this = $(this),
                        thisIndex = $this.index();
                    console.log('게시글 뷰에 있는 사진 넘버 :', thisIndex);
                    $.ajax({
                        url : '/site/www/bbsalt/'+nttNo+'.html',
                        success : function (data) {
                            var MachingText = $(data),
                                ItemLength = $(data).find('.bbsalt_item').length;
                            if(ItemLength > 0){
                                if(MachingText){
                                    $this.append($(data).find('.bbsalt_item[data-file="'+thisIndex+'"]'));
                                }
                            }
                        }
                    });
                });
            }
        }
        //게시판 대체텍스트 파라미터 판단 ajax 끝

    });
})(jQuery);