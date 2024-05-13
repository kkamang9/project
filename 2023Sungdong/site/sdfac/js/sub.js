(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');

        $sideDepthItem.on('click.menu', function (event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target,
                IsActive = $this.is('.active');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    var $Depth = $this.children('.depth'),
                        DepthDisplay = $Depth.css('display');
                    if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                        if (!IsActive) {
                            $this.removeClass('active_prev active_next');
                            $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                            $this.prev('.depth_item').addClass('active_prev');
                            $this.next('.depth_item').addClass('active_next');
                        } else {
                            $this.removeClass('active');
                            $this.siblings('.depth_item').removeClass('active_prev active_next');
                        }
                        event.preventDefault();
                    }
                }
            }

            event.stopPropagation();
        }).each(function (index, element) {
            var $element = $(element);

            if ($element.children('.depth').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
            }
        });

        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
        }

        //여기서부터 코드 작성해주세요

        //반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });
        //반응형 테이블 끝

        //////////////////////////////////////////
        // 컨텐츠 탭메뉴 시작
        var $contents = $('#contents'),
            $tabBox = $contents.find('.tab_wrap').not('.type_cms'),
            $tabList = $tabBox.find('.tab_list'),
            $tabItem = $tabBox.find('.tab_item'),
            $tabLink = $tabBox.find('button.tab_link'),
            $tabConList = $tabBox.find('.tab_con_list'),
            $tabConItem = $tabBox.find('.tab_con_item');

        $tabLink.on('click', function (){
            var $this = $(this),
                $tabItemIndex = $this.parent($tabItem).index();

            $this.parent($tabItem).siblings($tabItem).removeClass('active');
            $this.parent($tabItem).addClass('active');
            $this.parents($tabList).find($tabLink).removeAttr('title');
            $this.attr('title', '선택됨');
            $this.parents($tabList).next($tabConList).find($tabConItem).removeClass('active');
            $this.parents($tabList).next($tabConList).find($tabConItem).eq($tabItemIndex).addClass('active');
        });
        // 컨텐츠 탭메뉴 끝

        // 가짜셀렉트 시작
        var $facSelBox = $('.fac_fake_select_box');

        $facSelBox.each(function () {
            var $this = $(this),
                $realSel = $this.find('select.real_select'),
                $realSelOpt = $realSel.find('option'),
                $fakeSelOpenBtn = $this.find('button.fac_select_open_btn'),
                $fakeSelOpenText =  $fakeSelOpenBtn.find('span'),
                $fakeSelList = $this.find('.fake_select_list'),
                $fakeSelItem = $fakeSelList.find('.fake_select_item'),
                $fakeSelItemActive = $fakeSelItem.siblings('.fake_select_item.active'),
                $fakeSelBtn = $fakeSelItem.find('button.fake_select_btn'),
                $fakeSelItemActiveText = $fakeSelItemActive.find('button.fake_select_btn'),
                $fakeSelItemActiveIndex = $fakeSelItemActive.index(),
                $StartSelOpt = $realSel.find('option').eq($fakeSelItemActiveIndex);

            $StartSelOpt.attr('selected', true);
            $fakeSelOpenText.text($fakeSelItemActiveText.text());

            // option text 매칭
            $fakeSelItem.each(function() {
                var fakeItemIndex = $(this).index(),
                    $fakeSelBtnText = $(this).find('button.fake_select_btn').text(),
                    $fakeSelOptionText = $realSelOpt.eq(fakeItemIndex).text($fakeSelBtnText);
            });

            // facSelBox on off
            $fakeSelOpenBtn.on('click', function () {
                if ($facSelBox.hasClass('active')) {
                    $facSelBox.removeClass('active');
                    $(this).attr('title', '하위메뉴 열기');
                } else {
                    $facSelBox.addClass('active');
                    $(this).attr('title', '하위메뉴 닫기');
                };
            });

            // btn select
            $fakeSelBtn.on('click', function () {
                var fakeSelItemIndex = $(this).closest('.fake_select_item').index();

                $(this).attr('title', '선택됨').closest('.fake_select_item').addClass('active').siblings().removeClass('active').children().removeAttr('title');
                $realSelOpt.eq(fakeSelItemIndex).attr('selected', true).siblings().attr('selected', false);
                $fakeSelOpenText.text($(this).text()).closest('.fake_select_btn_open').attr('title', '셀렉트박스 열기');
                $facSelBox.removeClass('active');
                $fakeSelOpenBtn.focus();
            });
        });
        // 가짜셀렉트 끝

        // 오름차순 클래스변경 시작
        $('.program_wrap.lecture_list .table .sorting_btn').on('click',function (){
            if ($(this).hasClass('active') == false){
                $(this).attr('title', '기본순으로 변경')
            } else if ($(this).hasClass('active') == true) {
                $(this).attr('title', '오름차순으로 변경')
            }
            $(this).toggleClass('active');
        });
        // 오름차순 클래스변경 끝

        // 프로그램 박스 슬라이드 업다운 시작
        $('.program_wrap.applicant_info .fac_box.type_detail .btn_open').on('click',function (){
            if ($(this).parents('.fac_box.type_detail').hasClass('active') == false){
                $(this).attr('title', '열기')
            } else if ($(this).parents('.fac_box.type_detail').hasClass('active') == true) {
                $(this).attr('title', '닫기')
            }
            $(this).parents('.fac_box.type_detail').toggleClass('active');
            $(this).parents('.fac_box.type_detail').find('.detail_inner').stop().slideToggle();
        });
        // 프로그램 박스 슬라이드 업다운 끝

        // 대리신청 여부에 따른 수강자 정보 on off 시작
        $('.applicant_info .fac_form .fac_radio').on('click',function (){
            if ($('.fac_form .deputy').is(':checked')) {
                $('.applicant_info .participant').addClass('active');
            } else {
                $('.applicant_info .participant').removeClass('active');
            }
        });
        // 대리신청 여부에 따른 수강자 정보 on off 끝

        // 팝업 시작
        $('.program_wrap.register_check .table .btn.refund').on('click',function (){
            $(this).parents('.fac_btn_wrap').next('.popup_wrap').css('display', 'block')
        });
        $('.program_wrap.register_check .popup_wrap .popup_close button').on('click',function (){
            $(this).parents('.popup_wrap').css('display', 'none')
        });
        // 팝업 끝
        
        // 프로그램 박스 강좌목록 스크롤 시작
        var $electiveContent = $('.program_wrap .fac_box.type_detail.elective .detail_inner .detail_content'),
            $electiveLength = $electiveContent.find('.table tbody tr').length;
        if ($electiveLength > 10) {
            $electiveContent.addClass('on_scroll');
        } else {
            $electiveContent.removeClass('on_scroll');
        }
        // 프로그램 박스 강좌목록 스크롤 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);