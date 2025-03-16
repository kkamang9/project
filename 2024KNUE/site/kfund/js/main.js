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
        
        //3자리마다 (,) 찍기
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // slick button class
        var $globalControlBox = $('.control_box'),
            $globalPrevBtn = $globalControlBox.find('.button_box.prev .btn'),
            $globalNextBtn = $globalControlBox.find('.button_box.next .btn'),
            $globalBtn = $globalControlBox.find('.button_box .btn');
        $globalPrevBtn.mouseover(function(){
            $(this).parent().parent().removeClass('next_hover').addClass('prev_hover btn_hover');
        });
        $globalNextBtn.mouseover(function(){
            $(this).parent().parent().removeClass('prev_hover').addClass('next_hover btn_hover');
        });
        $globalBtn.mouseleave(function(){
            $(this).parent().parent().removeClass('prev_hover next_hover btn_hover');
        });
        
        // section1 - main visual - S
        var $visualBox = $('.visual_wrap .visual_box'),
            $visualList = $visualBox.find('.visual_list'),
            $visualControlBox = $visualBox.find('.control_box'),
            $visualPrev = $visualControlBox.find('.button_box.prev .btn'),
            $visualNext = $visualControlBox.find('.button_box.next .btn'),
            $visualAuto = $visualControlBox.find('.button_box.auto .btn');
        
        // visual slick
        $visualList.slick({
            accessibility: true, //접근성
            slidesToShow: 1, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            fade: true, //페이드 효과
            infinite: true, //무한반복
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true, //마우스 오버 했을 때 자동 일시정지 유무
            pauseOnFocus: true, //포커스 갔을때 일시정지 유무
            pauseOnDotsHover: true, //썸네일 마우스 올렸을 때 일시정지 유무
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            arrows: true, //컨트롤러 사용 유무
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
        });
        // section1 - main visual - E
        
        // section3 - donation - S
        var $donationWrap = $('.donation_wrap'),
            $countItem = $donationWrap.find('.amount_box .amount .count_wrap .count_item'),
            $countData = $countItem.find('.count').attr('data-count'),
            $counting = $countItem.find('.counting'),
            $donatorList = $donationWrap.find('.donator_box .donator_list'),
            $donationList = $donationWrap.find('.content_box .box_inner .donation_list'),
            $controlBox = $donationWrap.find('.content_box .box_inner .control_box'),
            $donationPrev = $controlBox.find('.button_box.prev .btn'),
            $donationNext = $controlBox.find('.button_box.next .btn');
        
        // count_shadow data-count 값 동기화
        // $countItem.find('.count_shadow').attr('data-count', $countData);
        
        // counting
        $counting.each(function(){
            var $this = $(this),
                countingNum = $this.attr('data-count');
            
            var num = numberWithCommas(Math.floor(this.val));
            
            $({ val : 0 }).animate({ val : countingNum }, {
                duration: 1500,
                step: function() {
                    var num = numberWithCommas(Math.floor(this.val));
                    $this.text(num);
                },
                complete: function() {
                    var num = numberWithCommas(Math.floor(this.val));
                    $this.text(num);
                }
            });
        });
        
        // donator slick
        $donatorList.slick({
            accessibility: true, //접근성
            variableWidth: true, //슬라이드 아이템의 width 를 css 로 제어
            slidesToShow: 1, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 4000, //속도
            infinite: true, //무한반복
            autoplay: true,
            autoplaySpeed: 1000,
            pauseOnHover: true, //마우스 오버 했을 때 자동 일시정지 유무
            pauseOnFocus: true, //포커스 갔을때 일시정지 유무
            pauseOnDotsHover: true, //썸네일 마우스 올렸을 때 일시정지 유무
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            arrows: false, //컨트롤러 사용 유무
            dots: false, //썸네일 사용여부
            draggable: true, //마우스로 드레그
            swipe: true, //터치 유무
            swipeToSlide: true, //터치로 밀었을 때 자연스럽게
            easing: 'linear',
            cssEase: 'linear', //슬릭 슬라이딩 타이밍펑션
            responsive: [{
                breakpoint: 1001,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    speed: 1000,
                    autoplaySpeed: 3000,
                }
            }]
        });
        
        // donation slick
        $donationList.slick({
            accessibility: true, //접근성
            variableWidth: true, //슬라이드 아이템의 width 를 css 로 제어
            slidesToShow: 3, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            arrows: true, //컨트롤러 사용 유무
            prevArrow: $donationPrev,
            nextArrow: $donationNext,
            responsive: [{
                breakpoint: 1251,
                settings: {
                    slidesToShow: 2,
                }
            },{
                breakpoint: 801,
                settings: {
                    slidesToShow: 1,
                }
            },{
                breakpoint: 641,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1,
                    centerPadding: 60,
                }
            }]
        });
        
        // section3 - donation - E
        
        // section4 - info - S
        var $infoWrap = $('.info_wrap'),
            $infoContentBox = $infoWrap.find('.section_inner .guide_box .content_box'),
            $guideList = $infoContentBox.find('.guide_list'),
            $guideControlBox = $infoContentBox.find('.control_box'),
            $guidePrev = $guideControlBox.find('.button_box.prev .btn'),
            $guideNext = $guideControlBox.find('.button_box.next .btn');
        // guide slick
        $guideList.slick({
            accessibility: true, //접근성
            slidesToShow: 4, //화면에 출력할 개수
            slidesToScroll: 1, //넘어갈 때 넘어갈 개수
            speed: 1000, //속도
            infinite: false, //무한반복
            arrows: true, //컨트롤러 사용 유무
            prevArrow: $guidePrev,
            nextArrow: $guideNext,
            // initialSlide: 1,
            responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                }
            },{
                breakpoint: 1001,
                settings: {
                    variableWidth: true,
                    slidesToShow: 5,
                    infinite: true,
                    centerMode: true,
                    centerPadding: false,
                }
            },{
                breakpoint: 861,
                settings: {
                    variableWidth: true,
                    slidesToShow: 3,
                    infinite: true,
                    centerMode: true,
                    centerPadding: false,
                }
            },{
                breakpoint: 641,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                }
            }]
        });
        // slick center mode tabindex error fix
        $infoWrap.find('.slick-slide').not('.slick-active').attr('tabindex','-1')
        $window.resize(function(){
            $infoWrap.find('.slick-slide').not('.slick-active').attr('tabindex','-1')
        });
        // section4 - info - E

    });
})(jQuery);
