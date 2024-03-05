'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);
            $(function() {
                
                // 농업기술센터 메인 공통 탭메뉴 - S
                var $tabBox = $('.tab_box');
                $tabBox.each(function(){
                    var $this = $(this),
                        $tabButtonBox = $this.find('.tab_button_wrap .button_box'),
                        $tabBtn = $tabButtonBox.find('.btn'),
                        $tabContentItem = $this.find('.content_list .content_item');
                    $tabBtn.on('click', function(){
                        var $thisBtn = $(this),
                            $tabIndex = $thisBtn.parent($tabButtonBox).index();
                        $tabBtn.removeAttr('title').parent($tabButtonBox).removeClass('active');
                        $thisBtn.attr('title', '선택됨').parent($tabButtonBox).addClass('active');
                        $tabContentItem.removeClass('active').eq($tabIndex).addClass('active');
                    });
                });
                // 농업기술센터 메인 공통 탭메뉴 - E
                
                // 음성 메인 팝업 슬라이드 - S
                var $popupBox = $('.popup_box'),
                    $popupSlide = $popupBox.find('.popup_slide'),
                    $popupButtonWrap = $popupBox.find('.popup_button_wrap'),
                    $popupButtonPrev = $popupButtonWrap.find('.button_box.prev .btn'),
                    $popupButtonNext = $popupButtonWrap.find('.button_box.next .btn'),
                    $popupButtonAuto = $popupButtonWrap.find('.button_box.auto .btn'),
                    $popupNumberBox = $popupButtonWrap.find('.number_box'),
                    $popupNumberTotal = $popupNumberBox.find('.popup_num.total'),
                    $popupNumberCurrent = $popupNumberBox.find('.popup_num.current');
                $popupSlide.slick({
                    accessibility: true,
                    variableWidth: false,
                    adaptiveHeight: false,
                    rows: 1,
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    fade: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: true,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    arrows: true,
                    prevArrow: $popupButtonPrev,
                    nextArrow: $popupButtonNext,
                    autoArrow: $popupButtonAuto,
                    pauseText: '정지',
                    playText: '재생',
                    total: $popupNumberTotal,
                    current: $popupNumberCurrent,
                    dots: false,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    zIndex: 0,
                    responsive: [{}]
                });
                // 음성 메인 팝업 슬라이드 - E
                
                // 농특산물 슬라이드 - S
                var $boastBox = $('.boast_wrap .boast_box'),
                    $boastSlide = $boastBox.find('.boast_slide'),
                    $boastSlideLength = $boastSlide.find('.boast_item').length,
                    $boastButtonWrap = $boastBox.find('.slide_button_wrap'),
                    $boastButtonPrev = $boastButtonWrap.find('.button_box.prev .btn'),
                    $boastButtonNext = $boastButtonWrap.find('.button_box.next .btn'),
                    $boastButtonAuto = $boastButtonWrap.find('.button_box.auto .btn'),
                    $boastNumberBox = $boastButtonWrap.find('.number_wrap .number_box'),
                    $boastNumberTotal = $boastNumberBox.find('.boast_num.total'),
                    $boastNumberCurrent = $boastNumberBox.find('.boast_num.current'),
                    $boastNumberBar = $boastNumberBox.find('.boast_num.bar'),
                    $Gage = $boastNumberBar.find('.gage');
                // 슬라이드 아이템 토탈 개수
                $boastNumberTotal.text($boastSlideLength);
                // 슬라이드 시작 페이지네이션
                $boastSlide.on('init', function(event, slick, currentSlide) {
                    setTimeout(function(){
                        $boastNumberBar.addClass('active');
                    }, 1);
                });
                $boastSlide.slick({
                    accessibility: true,
                    variableWidth: true,
                    adaptiveHeight: false,
                    rows: 1,
                    slidesPerRow: 1,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 1000,
                    fade: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: true,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    arrows: true,
                    prevArrow: $boastButtonPrev,
                    nextArrow: $boastButtonNext,
                    autoArrow: $boastButtonAuto,
                    pauseText: '정지',
                    playText: '재생',
                    current: $boastNumberCurrent,
                    dots: false,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    zIndex: 0,
                    responsive: [
                        {
                            breakpoint: 1501,
                            settings: {
                                slidesToShow: 2,
                            }
                        },{
                            breakpoint: 1201,
                            settings: {
                                slidesToShow: 1,
                            }
                        },{
                            breakpoint: 1001,
                            settings: {
                                slidesToShow: 3,
                            }
                        },{
                            breakpoint: 801,
                            settings: {
                                slidesToShow: 2,
                            }
                        },{
                            breakpoint: 641,
                            settings: {
                                slidesToShow: 3,
                            }
                        },{
                            breakpoint: 581,
                            settings: {
                                slidesToShow: 2,
                            }
                        },{
                            breakpoint: 401,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });
                // 슬라이드 동작시 페이지네이션 제거
                $boastSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    $boastNumberBar.removeClass('active');
                });
                // 슬라이드 동작 후 페이지네이션 재개,
                $boastSlide.on('afterChange', function(event, slick, currentSlide, nextSlide) {
                    $boastNumberBar.addClass('active');
                    if($boastButtonAuto.is('.slick-pause')){
                        $Gage.css('animation-play-state', 'running');
                    }
                    else{
                        $Gage.css('animation-play-state', 'paused');
                    }
                });
                // 오토 버튼 클릭 시 페이지네이션 토글
                $boastButtonAuto.on('click', function(){
                    var $this = $(this);
                    if($this.is('.slick-pause')){
                        $Gage.css('animation-play-state', 'running');
                    }
                    else{
                        $Gage.css('animation-play-state', 'paused');
                    }
                });
                // 농특산물 슬라이드 - E
                
                // 농업인 교육 정보 교육일정 아이템 감지 - S
                var $contentItem = $('.education_wrap .schedule_box .content_list .content_item');
                $contentItem.each(function(){
                    var $this = $(this),
                        $scheduleItemLength = $this.find('.schedule_list .schedule_item').length;
                    if($scheduleItemLength >= 4){
                        $this.addClass('item_full')
                    }
                });
                // 농업인 교육 정보 교육일정 아이템 감지 - E

                $window.on('screen:wide screen:web', function(event) {});
                $window.on('screen:tablet screen:phone', function(event) {});
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}